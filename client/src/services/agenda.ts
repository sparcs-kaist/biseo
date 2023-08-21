import { socket } from "@/socket";
import { create } from "zustand";
import type { Agenda } from "biseo-interface/agenda";

interface AgendaState {
  agendas: Agenda[];
  voteAgenda: (choiceId: number, agendaId: number) => void;
  retrieveAgendas: () => void;
}

const useAgenda = create<AgendaState>(set => ({
  agendas: [],
  voteAgenda: async (choiceId, agendaId) => {
    try {
      await socket.emitAsync("agenda.vote", { choiceId, agendaId });
    } catch (error) {
      // TODO: globally handle error using zustand middleware
    }
  },
  retrieveAgendas: async () => {
    try {
      const agendas = await socket.emitAsync("agenda.retrieveAll", {});
      set({ agendas: agendas });
    } catch (error) {
      // TODO: globally handle error using zustand middleware
    }
  },
}));

socket.on("agenda.started", ongoingAgenda => {
  useAgenda.setState(state => ({
    agendas: [...state.agendas, ongoingAgenda],
  }));
});

socket.on("agenda.voted", ({ id, user, voters }) => {
  useAgenda.setState(state => {
    const updatedAgendas = state.agendas.map(agenda =>
      agenda.id === id
        ? {
            ...agenda,
            user: { votable: agenda.user.votable, voted: user.voted },
            voters: voters,
          }
        : agenda,
    );
    return { agendas: updatedAgendas };
  });
});

socket.on("agenda.terminated", terminatedAgenda => {
  useAgenda.setState(state => {
    const updatedAgendas = state.agendas.map(agenda =>
      agenda.id === terminatedAgenda.id ? terminatedAgenda : agenda,
    );
    return { agendas: updatedAgendas };
  });
});

socket.on("agenda.reminded", reminded => {
  // TODO: Fix the alert algorithm according to the design
  alert(`Reminder Alert ${reminded.agendaId}: ${reminded.message}`);
});

export { useAgenda };
