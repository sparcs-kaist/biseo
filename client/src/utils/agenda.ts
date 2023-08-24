import { AdminAgenda } from "@biseo/interface/admin/agenda";
import type {
  Agenda,
  OngoingAgenda,
  PreparingAgenda,
  TerminatedAgenda,
} from "@biseo/interface/agenda";

export const isPreparingAgenda = (
  agenda: Agenda | AdminAgenda,
): agenda is PreparingAgenda => {
  return agenda.status === "preparing";
};

export const isOngoingAgenda = (
  agenda: Agenda | AdminAgenda,
): agenda is OngoingAgenda => {
  return agenda.status === "ongoing";
};

export const isTerminatedAgenda = (
  agenda: Agenda | AdminAgenda,
): agenda is TerminatedAgenda => {
  return agenda.status === "terminated";
};
