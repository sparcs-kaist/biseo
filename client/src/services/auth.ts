import { socket } from "@/socket";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const useAuth = create<AuthState>()(
  persist(set => ({
    token: null,
    login: (token) => {
      set({ token });
      socket.connect();
      // TODO: handle error when connection fail
    },
    logout: () => {
      set({ token: null });
      socket.disconnect();
    },
  }), {
    name: "auth-storage",
    storage: createJSONStorage(() => sessionStorage),
    partialize: state => ({ token: state.token }),
  }),
);

socket.auth = (cb) => {
  cb({ token: useAuth.getState().token });
};

export { useAuth };
