import type { AgendaStatus } from "@biseo/interface/agenda";

export const agendaStatusNames: Record<AgendaStatus, string> = {
  preparing: "예정된 투표",
  ongoing: "진행중인 투표",
  terminated: "종료된 투표",
} as const;
