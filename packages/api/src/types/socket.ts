import type { Server, Socket } from "socket.io";
import type { DefaultEventsMap } from "@socket.io/component-emitter";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@biseo/interface";
import type { User } from "@prisma/client";

interface ServerData {
  user: User;
}

export type BiseoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  ServerData
>;

export type BiseoSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  DefaultEventsMap,
  ServerData
>;
