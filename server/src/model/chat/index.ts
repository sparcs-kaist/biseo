import type { Prefix } from "@socket/helpers";
import type { ClientToServerEvents } from "./client";
import type { ServerToClientEvents } from "./server";

export type ChatClientToServerEvents = Prefix<"chat", ClientToServerEvents>;
export type ChatServerToClientEvents = Prefix<"chat", ServerToClientEvents>;
