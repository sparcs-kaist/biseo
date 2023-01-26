import type { AdminAgenda } from "./admin/agenda";
import type { Agenda } from "./agenda";
import type { Chat } from "./chat";
import type { User } from "./user";

export type ClientToServerEvents = AdminAgenda.ClientToServerEvents &
  Agenda.ClientToServerEvents &
  Chat.ClientToServerEvents &
  User.ClientToServerEvents;

export type ServerToClientEvents = AdminAgenda.ServerToClientEvents &
  Agenda.ServerToClientEvents &
  Chat.ServerToClientEvents &
  User.ServerToClientEvents;
