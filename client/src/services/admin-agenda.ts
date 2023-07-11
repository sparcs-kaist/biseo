import { socket } from "@/socket";
import { create } from "zustand";
import type {
  AdminAgenda,
  AdminAgendaCreate,
  AdminAgendaUpdate,
} from "biseo-interface/admin/agenda";
import type { AgendaStatus } from "biseo-interface/agenda";

interface AdminAgendaState {
  adminAgendas: AdminAgenda[];
  createAgenda: (agenda: AdminAgendaCreate) => void;
  retrieveAll: () => void;
  statusUpdate: (id: number, status: AgendaStatus) => void;
  updateAgenda: (agenda: AdminAgendaUpdate) => void;
  deleteAgenda: (id: number) => void;
  remindAgenda: (id: number) => void;
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

  updateAgenda: async (agenda) => {
    try {
      await socket.emitAsync("admin.agenda.update", agenda);
    } catch (error) {
      // TODO: handle error
    }
  },

  deleteAgenda: async (id) => {
    try {
      await socket.emitAsync("admin.agenda.delete", { id });
    } catch (error) {
      // TODO: handle error
    }
  },

  remindAgenda: async (id) => {
    try {
      await socket.emitAsync("admin.agenda.remind", { id });
    } catch (error) {
      // TODO: handle error
    }
  },
}));

socket.on("admin.agenda.created", (adminAgenda) => {
  useAdminAgenda.setState((state) => ({
    // TODO: handle local id
    adminAgendas: [...state.adminAgendas, adminAgenda],
  }));
});

socket.on("admin.agenda.statusUpdated", ({ id }) => {
  useAdminAgenda.setState((state) => {
    const newAdminAgendas: AdminAgenda[] = state.adminAgendas.map((agenda) => {
      if (agenda.id === id) {
        if (agenda.status === "preparing") {
          return { ...agenda, status: "ongoing" };
        } else if (agenda.status === "ongoing") {
          return { ...agenda, status: "terminated" };
        }
      }
      return agenda;
    });
    return {
      // TODO: handle local id
      adminAgendas: newAdminAgendas,
    };
  });
});

socket.on("admin.agenda.updated", (adminAgenda) => {
  useAdminAgenda.setState((state) => {
    const newAgendas: AdminAgenda[] = state.adminAgendas.map((agenda) => {
      if (agenda.id === adminAgenda.id) {
        return adminAgenda;
      }
      return agenda;
    });
    return {
      // TODO: handle local id
      adminAgendas: [...newAgendas],
    };
  });
});
