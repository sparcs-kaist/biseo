import { Server, Socket } from "socket.io";
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/interface";

export type BiseoServer = Server<
  ClientToServerEvents,
  ServerToClientEvents
>;

export type BiseoSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents
>;
