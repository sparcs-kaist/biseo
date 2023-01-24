import type {
  ChatServerToClientEvents,
  ChatClientToServerEvents,
} from "./chat";


export type ClientToServerEvents =
  & ChatClientToServerEvents;

export type ServerToClientEvents =
  & ChatServerToClientEvents;
