import type { Prefix } from "../helpers";
import type { ClientEvents } from "./client";
import type { ServerEvents } from "./server";

export * from "./common";
export * from "./client";
export * from "./server";

export namespace Agenda {
  export type ClientToServerEvents = Prefix<"agenda", ClientEvents>;
  export type ServerToClientEvents = Prefix<"agenda", ServerEvents>;
}
