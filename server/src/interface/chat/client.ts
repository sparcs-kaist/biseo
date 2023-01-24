import { z } from "zod";
import type { ClientEvent } from "../helpers";
import { Message } from "./common";

// Send
export const Send = z.object({
  message: z.string(),
});
type Send = z.infer<typeof Send>;
export const SendCallback = Message;
type SendCallback = z.infer<typeof SendCallback>;

// Retrieve
export const Retrieve = z.object({
  lastChatId: z.number().nullable(),
  limit: z.number(),
});
type Retrieve = z.infer<typeof Retrieve>;
export const RetrieveCallback = z.array(Message);
type RetrieveCallback = z.infer<typeof RetrieveCallback>;

export interface ClientToServerEvents {
  send: ClientEvent<Send, SendCallback>;
  retrieve: ClientEvent<Retrieve, RetrieveCallback>;
}
