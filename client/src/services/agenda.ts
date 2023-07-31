import { socket } from "@/socket";
import { create } from "zustand";
import type { Agenda } from "biseo-interface/agenda";

interface AgendaState {
  agendas: Agenda[];
  voteAgenda: (agendaId: number, choiceId: number) => void;
  retrieveAgendas: () => void;
}

const useAgenda = create<AgendaState>((set, get) => ({
  agendas: [],
  voteAgenda: async (agendaId, choiceId) => {
    try {
      await socket.emitAsync("agenda.vote", { agendaId, choiceId });
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

socket.on("agenda.voted", voted => {
  useAgenda.setState(state => {
    const updatedAgendas = state.agendas.map(agenda =>
      agenda.id === voted.id ? { ...agenda, voters: voted.voters } : agenda,
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
