import type { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents
} from "@server";

/** Shared socket from server side code are configured here globally */
export type BiseoSocket = Socket<
  ServerToClientEvents,
  ClientToServerEvents
>;
