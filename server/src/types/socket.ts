import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "biseo-interface";

export type BiseoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents
>;

export type BiseoSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents
>;
