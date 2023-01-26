import type { Prefix } from "../../helpers";
import type { ClientEvents } from "./client";
import type { ServerEvents } from "./server";

export * from "./common";
export * from "./client";
export * from "./server";

export namespace AdminAgenda {
  export type ClientToServerEvents = Prefix<"admin/agenda", ClientEvents>;
  export type ServerToClientEvents = Prefix<"admin/agenda", ServerEvents>;
}
