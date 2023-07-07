import { socket } from "@/socket";
import { create } from "zustand";
import type { AdminAgenda, AdminAgendaCreate } from "biseo-interface/admin/agenda";


interface AdminAgendaState {
    adminAgendas: AdminAgenda[];
    createAgenda: (agenda : AdminAgendaCreate) => void;
}

const useAdminAgenda = create<AdminAgendaState>((set,get) => ({
    adminAgendas: [],

    createAgenda: async (agenda) => {
        try {
            await socket.emitAsync("admin.agenda.create",agenda);
        } catch (error){
            // TODO: handle error
        }
    },


}))



