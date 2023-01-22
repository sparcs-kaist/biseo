import type {
  ChatClientToServerEvents,
  ChatServerToClientEvents,
} from "../server/src/model";

export type ClientToServerEvents =
  & ChatClientToServerEvents;

export type ServerToClientEvents =
  & ChatServerToClientEvents;

