import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Init } from "@biseo/interface/init";

import { socket } from "@biseo/web/socket";
import { initSocket } from "@biseo/web/socket/init";
import { getToken, getGoogleToken } from "@biseo/web/common/api/auth";

interface AuthState {
  token: string | null;
  userInfo: Init | null;
  init: () => Promise<Init | null>;
  login: (username: string, password: string) => Promise<void>;
  glogin: (code: string) => Promise<void>;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userInfo: null,
      init: async () => {
        const { token, userInfo } = get();
        if (socket.connected) return userInfo;
        if (!token) return null;

        try {
          const initialUserInfo = await initSocket(token);
          set({ userInfo: initialUserInfo });
          return initialUserInfo;
        } catch (e) {
          set({ token: null, userInfo: null });
          return null;
        }
      },
      login: async (username, password) => {
        const token = await getToken(username, password);

        if (!token) throw new Error("incorrect username or password");

        const userInfo = await initSocket(token);
        set({ token, userInfo });
      },
      glogin: async code => {
        const token = await getGoogleToken(code);

        if (!token) throw new Error("incorrect username");

        const userInfo = await initSocket(token);
        set({ token, userInfo });
      },
      logout: () => {
        set({ token: null, userInfo: null });
        socket.disconnect();
        console.log("logout");
      },
    }),
    {
      name: "auth-storage",
      partialize: state => ({ token: state.token }),
    },
  ),
);

useAuth.getState().init().catch(console.error);

export { useAuth };
