import { io } from "socket.io-client";
import type { BiseoSocket } from "./types";
import { emitAsync } from "./utils";

export const socket = Object.assign(
  io(import.meta.env.VITE_SERVER_URL, { autoConnect: false }) as BiseoSocket,
  { emitAsync }
);
