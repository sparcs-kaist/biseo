import { create } from "zustand";
import type {
  AgendaTemplate,
  AgendaTemplateCreate,
  AgendaTemplateUpdate,
} from "@biseo/interface/agenda/template";
import { socket } from "@/socket";

interface AgendaTemplateState {
  agendaTemplates: AgendaTemplate[];
  findTemplate: (id: number) => AgendaTemplate | undefined;
  createTemplate: (template: AgendaTemplateCreate) => void;
  retrieveAll: () => void;
  updateTemplate: (template: AgendaTemplateUpdate) => void;
  deleteTemplate: (id: number) => void;
}

export const useAgendaTemplate = create<AgendaTemplateState>((set, get) => ({
  agendaTemplates: [],

  findTemplate: id =>
    get().agendaTemplates.find(template => template.id === id),

  createTemplate: async template => {
    try {
      await socket.emitAsync("agenda.template.create", template);
    } catch (error) {
      // TODO: handle error
    }
  },

  retrieveAll: async () => {
    try {
      const retAgendaTemplates = await socket.emitAsync(
        "agenda.template.retrieveAll",
        {},
      );
      set({ agendaTemplates: retAgendaTemplates });
    } catch (error) {
      // TODO: handle error
    }
  },

  updateTemplate: async template => {
    try {
      await socket.emitAsync("agenda.template.update", template);
    } catch (error) {
      // TODO: handle error
    }
  },

  deleteTemplate: async id => {
    try {
      await socket.emitAsync("agenda.template.delete", { id });
    } catch (error) {
      // TODO: handle error
    }
  },
}));

socket.on("agenda.template.created", agendaTemplate => {
  useAgendaTemplate.setState(state => ({
    agendaTemplates: [...state.agendaTemplates, agendaTemplate],
  }));
});

socket.on("agenda.template.updated", agendaTemplate => {
  useAgendaTemplate.setState(state => {
    const newTemplates: AgendaTemplate[] = state.agendaTemplates.map(
      template => {
        if (template.id === agendaTemplate.id) {
          return agendaTemplate;
        }
        return template;
      },
    );
    return {
      agendaTemplates: newTemplates,
    };
  });
});

socket.on("agenda.template.deleted", agendaTemplate => {
  useAgendaTemplate.setState(state => {
    const newTemplates: AgendaTemplate[] = state.agendaTemplates.filter(
      template => template.id !== agendaTemplate.id,
    );
    return {
      agendaTemplates: newTemplates,
    };
  });
});
