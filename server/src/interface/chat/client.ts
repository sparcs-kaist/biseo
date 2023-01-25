import { z } from "zod";
import type { ClientEvent } from "../helpers";
import { Message } from "./common";

/**
 * Send
 * description
 */
export const Send = z.object({
  message: z.string(),
});
export type Send = z.infer<typeof Send>;
export const SendCallback = z.object({});
export type SendCallback = z.infer<typeof SendCallback>;

/**
 * Retrieve
 * description
 */
export const Retrieve = z.object({
  lastChatId: z.number().nullable(),
  limit: z.number(),
});
export type Retrieve = z.infer<typeof Retrieve>;
export const RetrieveCallback = z.array(Message);
export type RetrieveCallback = z.infer<typeof RetrieveCallback>;

export interface ClientEvents {
  send: ClientEvent<Send, SendCallback>;
  retrieve: ClientEvent<Retrieve, RetrieveCallback>;
}
