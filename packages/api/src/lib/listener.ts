import type { ZodType } from "zod";

import type { ClientEventNames, ResponseOf, SchemaOf } from "@biseo/interface";
import type { Res } from "@biseo/interface/helpers";

import type { User } from "@prisma/client";
import type { BiseoServer, BiseoSocket } from "@biseo/api/types/socket";
import { BiseoError, errorHandler } from "./error";

type Listener = (io: BiseoServer, socket: BiseoSocket) => void;

interface HandlerContext {
  io: BiseoServer;
  socket: BiseoSocket;
  user: User;
}

type Handler<Ev extends ClientEventNames> = (
  data: SchemaOf<Ev>,
  context: HandlerContext,
) => Promise<ResponseOf<Ev>>;

const context = (io: BiseoServer, socket: BiseoSocket): HandlerContext => ({
  io,
  socket,
  user: socket.data.user!,
});

export const Router = () => {
  const listeners: Listener[] = [];

  const on = <Ev extends ClientEventNames>(
    event: Ev,
    schema: ZodType<SchemaOf<Ev>>,
    handler: Handler<Ev>,
  ) => {
    listeners.push((io, socket) =>
      socket.on<Ev>(event, ((
        req: SchemaOf<Ev>,
        callback: (res: Res<ResponseOf<Ev>>) => void,
      ) =>
        schema
          .parseAsync(req)
          .catch(() => {
            throw new BiseoError("bad request");
          })
          .then(data => handler(data, context(io, socket)))
          .then(res => callback({ ok: true, data: res }))
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch(errorHandler(callback))) as any),
    );
  };

  const register = (io: BiseoServer, socket: BiseoSocket) => {
    listeners.map(listener => listener(io, socket));
  };

  return { on, register };
};
