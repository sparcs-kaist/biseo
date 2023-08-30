import { socket } from "@/socket";
import { create } from "zustand";
import type {
  AdminAgenda,
  AdminAgendaCreate,
  AdminAgendaUpdate,
} from "@biseo/interface/admin/agenda";
import type { AgendaStatus } from "@biseo/interface/agenda";

interface AdminAgendaState {
  adminAgendas: AdminAgenda[];
  createAgenda: (agenda: AdminAgendaCreate) => void;
  retrieveAll: () => void;
  statusUpdate: (id: number, status: AgendaStatus) => void;
  updateAgenda: (agenda: AdminAgendaUpdate) => void;
  deleteAgenda: (id: number) => void;
  remindAgenda: (id: number) => void;
}

export const useAdminAgenda = create<AdminAgendaState>(set => ({
  adminAgendas: [],

  createAgenda: async agenda => {
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
        {},
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

  updateAgenda: async agenda => {
    try {
      await socket.emitAsync("admin.agenda.update", agenda);
    } catch (error) {
      // TODO: handle error
    }
  },

  deleteAgenda: async id => {
    try {
      await socket.emitAsync("admin.agenda.delete", { id });
    } catch (error) {
      // TODO: handle error
    }
  },

  remindAgenda: async id => {
    try {
      await socket.emitAsync("admin.agenda.remind", { id });
    } catch (error) {
      // TODO: handle error
    }
  },
}));

socket.on("admin.agenda.created", adminAgenda => {
  useAdminAgenda.setState(state => ({
    adminAgendas: [...state.adminAgendas, adminAgenda],
  }));
});

socket.on("admin.agenda.statusUpdated", ({ id, status }) => {
  useAdminAgenda.setState(state => {
    const newAdminAgendas: AdminAgenda[] = state.adminAgendas.map(agenda => {
      if (agenda.id === id) {
        return { ...agenda, status: status };
      }
      return agenda;
    });
    return {
      adminAgendas: newAdminAgendas,
    };
  });
});

socket.on("admin.agenda.updated", adminAgenda => {
  useAdminAgenda.setState(state => {
    const newAgendas: AdminAgenda[] = state.adminAgendas.map(agenda => {
      if (agenda.id === adminAgenda.id) {
        return adminAgenda;
      }
      return agenda;
    });
    return {
      adminAgendas: newAgendas,
    };
  });
});

socket.on("admin.agenda.deleted", adminAgenda => {
  useAdminAgenda.setState(state => {
    const newAgendas: AdminAgenda[] = state.adminAgendas.filter(
      agenda => agenda.id !== adminAgenda.id,
    );
    return {
      adminAgendas: newAgendas,
    };
  });
});

socket.on("admin.agenda.voted", voteData => {
  useAdminAgenda.setState(state => {
    const newAgendas: AdminAgenda[] = state.adminAgendas.map(agenda => {
      if (agenda.id === voteData.id) {
        return {
          ...agenda,
          choices: voteData.choices,
          voters: voteData.voters,
        };
      }
      return agenda;
    });
    return {
      adminAgendas: newAgendas,
    };
  });
});
