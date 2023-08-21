import { socket } from "@/socket";
import { create } from "zustand";
import type { AdminUser } from "biseo-interface/admin/user";

interface AdminUserState {
  adminUsers: AdminUser[];
  retrieveAll: () => void;
}

export const useAdminUser = create<AdminUserState>(set => ({
  adminUsers: [],

  retrieveAll: async () => {
    try {
      const retAdminUsers = await socket.emitAsync(
        "admin.user.retrieveAll",
        {},
      );
      set({ adminUsers: retAdminUsers });
    } catch (error) {
      // TODO: handle error
    }
  },
}));