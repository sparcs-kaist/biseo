import { io } from "socket.io-client";

import type { BiseoSocket } from "./types";
import { emitAsync } from "./utils";
import { SOCKET_URL } from "@/env";

export const socket = Object.assign(
  io({
    path: SOCKET_URL,
    autoConnect: false,
    transports: ["websocket"],
  }) as BiseoSocket,
  { emitAsync },
);
