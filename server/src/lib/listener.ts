import type { ZodType } from "zod";
import type { Server, Socket } from "socket.io";

import type { ClientEventNames, ResponseOf, SchemaOf } from "biseo-interface";
import type { Res } from "biseo-interface/helpers";

import type { BiseoServer, BiseoSocket } from "@/types/socket";
import { BiseoError, errorHandler } from "./error";

type Listener = (io: Server, socket: Socket) => void;

type Handler<Ev extends ClientEventNames> = (
  data: SchemaOf<Ev>,
  context: { io: BiseoServer, socket: BiseoSocket },
) => Promise<ResponseOf<Ev>>;

export const Router = () => {
  let initialized = false;
  const listeners: Listener[] = [];

  const on = <Ev extends ClientEventNames>(
    event: Ev,
    schema: ZodType<SchemaOf<Ev>>,
    handler: Handler<Ev>,
  ) => {
    listeners.push((io, socket) => socket.on<Ev>(event, ((
        req: SchemaOf<Ev>,
        callback: (res: Res<ResponseOf<Ev>>) => void,
      ) => schema
        .parseAsync(req)
        .catch(() => { throw new BiseoError("bad request"); })
        .then(req => handler(req, { io, socket }))
        .then(res => callback({ ok: true, data: res }))
        .catch(errorHandler(callback))
    ) as any));
  };

  const register = (io: Server) => {
    if (initialized) throw new Error("`register` must be called only once");
    initialized = true;

    io.on("connection", (socket) => listeners.map(
      listener => listener(io, socket),
    ));
  };

  return { on, register };
};
