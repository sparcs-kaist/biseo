import { io } from "socket.io-client";

import type { BiseoSocket } from "./types";
import { emitAsync } from "./utils";
import { API_URL } from "@/env";

export const socket = Object.assign(
  io({
    path: `${API_URL}/socket`,
    autoConnect: false,
    transports: ["websocket"],
  }) as BiseoSocket,
  { emitAsync },
);
