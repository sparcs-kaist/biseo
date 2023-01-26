import { io } from "socket.io-client";
import type { BiseoSocket } from "./types";
import { asyncifyEmit } from "./utils";

const _socket: BiseoSocket = io(
  import.meta.env.VITE_SERVER_URL,
  { autoConnect: false },
);

export const socket = Object.assign(_socket,
  { emitAsync: asyncifyEmit(_socket) },
);
