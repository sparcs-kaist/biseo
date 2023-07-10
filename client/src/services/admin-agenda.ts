import { socket } from "@/socket";
import { create } from "zustand";
import type {
  AdminAgenda,
  AdminAgendaCreate,
} from "biseo-interface/admin/agenda";
import type { AgendaStatus } from "biseo-interface/agenda";

interface AdminAgendaState {
  adminAgendas: AdminAgenda[];
  createAgenda: (agenda: AdminAgendaCreate) => void;
  retrieveAll: () => void;
  statusUpdate: (id: number, status: AgendaStatus) => void;
}

const useAdminAgenda = create<AdminAgendaState>((set, get) => ({
  adminAgendas: [],

  createAgenda: async (agenda) => {
    try {
      await socket.emitAsync("admin.agenda.create", agenda);
    } catch (error) {
      // TODO: handle error
    }
  },

  retrieveAll: async () => {
    try {
      const retAdminAgendas = await socket.emitAsync(
        "admin.agenda.retrieveAll",
        {}
      );
      set({ adminAgendas: retAdminAgendas });
    } catch (error) {
      // TODO: handle error
    }
  },
  statusUpdate: async (id, status) => {
    try {
      await socket.emitAsync("admin.agenda.statusUpdate", {
        id: id,
        status: status,
      });
    } catch {
      // TODO: handle error
    }
  },
}));
