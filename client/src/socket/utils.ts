import type { BiseoSocket } from "./types";

import type {
  EventNames,
  EventParams,
} from "@socket.io/component-emitter";

import type { ClientToServerEvents as EmitEvents } from "@server";
import type { CallbackResponse } from "@server/helpers";

export type ClientEventArgs<I extends Record<string, any>, O extends Record<string, any>>
  = [I, (output: CallbackResponse<O>) => void];

type Input<Args extends EventParams<EmitEvents, any>> =
  Args extends ClientEventArgs<infer I, infer O> ? I : never;
type Output<Args extends EventParams<EmitEvents, any>> =
  Args extends ClientEventArgs<infer I, infer O> ? O : never;

export const asyncifyEmit = (socket: BiseoSocket) => {
  return <Ev extends EventNames<EmitEvents>>(
    event: Ev,
    body: Input<EventParams<EmitEvents, Ev>>,
  ) => {
    type O = Output<EventParams<EmitEvents, Ev>>

    return new Promise<O>((resolve, reject) => {
      socket.emit<Ev>(event, ...[body, (res: CallbackResponse<O>) => {
        if (res.ok) {
          resolve(res.data);
        } else {
          reject(new Error(res.message));
        }
      }] as EventParams<EmitEvents, Ev>);
    });
  };
};
