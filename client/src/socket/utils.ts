import type { BiseoSocket } from "./types";

import type { EventNames, EventParams } from "@socket.io/component-emitter";

import type { ClientToServerEvents as EmitEvents } from "biseo-interface";
import type { Res } from "biseo-interface/helpers";

export type ClientEventArgs<
  I extends Record<string, any>,
  O extends Record<string, any>
> = [I, (output: Res<O>) => void];

type Input<Args extends EventParams<EmitEvents, any>> =
  Args extends ClientEventArgs<infer I, infer O> ? I : never;
type Output<Args extends EventParams<EmitEvents, any>> =
  Args extends ClientEventArgs<infer I, infer O> ? O : never;

export function emitAsync<Ev extends EventNames<EmitEvents>>(
  this: BiseoSocket,
  event: Ev,
  body: Input<EventParams<EmitEvents, Ev>>,
) {
  type O = Output<EventParams<EmitEvents, Ev>>;

  return new Promise<O>((resolve, reject) => {
    const callback = (res: Res<O>) =>
      res.ok ? resolve(res.data) : reject(new Error(res.message));
    const params = [body, callback] as EventParams<EmitEvents, Ev>;

    this.emit<Ev>(event, ...params);
  });
}
