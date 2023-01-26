import type { Prefix } from "../helpers";
import type { ClientEvents } from "./client";
import type { ServerEvents } from "./server";

export namespace Chat {
  export type ClientToServerEvents = Prefix<"chat", ClientEvents>;
  export type ServerToClientEvents = Prefix<"chat", ServerEvents>;
}
