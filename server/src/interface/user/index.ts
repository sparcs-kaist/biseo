import type { Prefix } from "../helpers";
import type { ClientEvents } from "./client";
import type { ServerEvents } from "./server";

export * from "./common";
export * from "./client";
export * from "./server";

export namespace User {
  export type ClientToServerEvents = Prefix<"user", ClientEvents>;
  export type ServerToClientEvents = Prefix<"user", ServerEvents>;
}
