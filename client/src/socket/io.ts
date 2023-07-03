import { io } from "socket.io-client";

import type { BiseoSocket } from "./types";
import { emitAsync } from "./utils";

export const socket = Object.assign(
  io({
    path: "/api/socket",
    autoConnect: false,
    transports: ["websocket"],
  }) as BiseoSocket,
  { emitAsync },
);
