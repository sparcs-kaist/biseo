import { ClientToServerEvents, ServerToClientEvents } from "./events";
import { Res } from "./helpers";

type AllEvents = ServerToClientEvents & ClientToServerEvents;

export type ClientEventNames = keyof ClientToServerEvents;
export type ServerEventNames = keyof ServerToClientEvents;
export type EventNames = keyof AllEvents;

/**
 * Get the input schema of an event.
 * @example type InputOf<"chat.send"> = { message: string };
 */
export type SchemaOf<Ev extends EventNames> = Parameters<AllEvents[Ev]>[0];

/**
 * Get the response schema of a client side event
 * @example type ResponseOf<"chat.send"> = {};
 */
export type ResponseOf<Ev extends ClientEventNames> = Parameters<
  Parameters<ClientToServerEvents[Ev]>[1]
>[0] extends Res<infer O>
  ? O
  : never;
