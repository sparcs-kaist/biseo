import { io } from "socket.io-client";
import { API_BASE } from "@/env";

import type { BiseoSocket } from "./types";
import { emitAsync } from "./utils";

export const socket = Object.assign(
  io(API_BASE, {
    path: "/api/socket",
    autoConnect: false,
    transports: ["websocket"],
  }) as BiseoSocket,
  { emitAsync },
);
