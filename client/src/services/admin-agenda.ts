import { socket } from "@/socket";
import { create } from "zustand";
import type { AdminAgenda } from "biseo-interface/admin/agenda";


interface AdminAgendaState {
    agendas: AdminAgenda[];
}

const useAdminAgenda = create<AdminAgendaState>((set,get) => ({
    agendas: [],
}))