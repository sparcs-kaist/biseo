import type { Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@socket/types";

/** Strict server type based on model schemas */
export type BiseoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents
>;

export type BiseoSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents
>;

