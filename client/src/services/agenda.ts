import { socket } from "@/socket";
import { create } from "zustand";
import { useEffect } from "react";
import {
  OngoingAgenda,
  TerminatedAgenda,
  Agenda,
} from "biseo-interface/agenda";

interface Voted {
  id: number;
  voters: {
    voted: number;
    total: number;
  };
}

interface Reminded {
  agendaId: number;
  message: string;
}

interface AgendaState {
  agendas: Agenda[];
  voteAgenda: (choiceId: number) => void;
  retrieveAgendas: () => void;
}

const useAgenda = create<AgendaState>((set, get) => ({
  agendas: [],
  voteAgenda: async (choiceId) => {
    try {
      await socket.emitAsync("agenda.vote", { choiceId });
    } catch (error) {
      // TODO: handle error
      console.error("Vote error:", error);
    }
  },
  retrieveAgendas: async () => {
    try {
      const agendas = await socket.emitAsync("agenda.retrieveAll", {
        lastAgendaId: get().agendas[0]?.id || null,
      });
      set((state) => ({ agendas: [...agendas, ...state.agendas] }));
    } catch (error) {
      // TODO: handle error
      console.error("Retrieve Agendas error:", error);
    }
  },
}));

socket.on("agenda.started", (ongoingAgenda: OngoingAgenda) => {
  useAgenda.setState((state) => ({
    agendas: [...state.agendas, ongoingAgenda],
  }));
});

socket.on("agenda.voted", (voted: Voted) => {
  useAgenda.setState((state) => {
    const updatedAgendas = state.agendas.map((agenda) =>
      agenda.id === voted.id ? { ...agenda, voters: voted.voters } : agenda
    );
    return { agendas: updatedAgendas };
  });
});

socket.on("agenda.terminated", (terminatedAgenda: TerminatedAgenda) => {
  useAgenda.setState((state) => {
    const updatedAgendas = state.agendas.map((agenda) =>
      agenda.id === terminatedAgenda.id ? terminatedAgenda : agenda
    );
    return { agendas: updatedAgendas };
  });
});

socket.on("agenda.reminded", (reminded: Reminded) => {
  // TODO: Fix the alert algorithm according to the design
  alert(`Reminder Alert ${reminded.agendaId}: ${reminded.message}`);
});

export { useAgenda };
