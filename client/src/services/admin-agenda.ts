import { socket } from "@/socket";
import { create } from "zustand";
import type { AdminAgenda } from "biseo-interface/admin/agenda";


interface AdminAgendaState {
    adminAgendas: AdminAgenda[];
}

const useAdminAgenda = create<AdminAgendaState>((set,get) => ({
    adminAgendas: [],
}))