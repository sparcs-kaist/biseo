import { z } from "zod";
import type { ClientEvent } from "../helpers";
import { messageSchema } from "./common";

// Send
export const sendSchema = z.object({
  message: z.string(),
});
type Send = z.infer<typeof sendSchema>;
export const sendCallbackSchema = messageSchema;
type SendCallback = z.infer<typeof sendCallbackSchema>;

// Retrieve
export const retrieveSchema = z.object({
  lastChatId: z.number().nullable(),
  limit: z.number(),
});
type Retrieve = z.infer<typeof retrieveSchema>;
export const retrieveCallbackSchema = z.array(messageSchema);
type RetrieveCallback = z.infer<typeof retrieveCallbackSchema>;

export interface ClientToServerEvents {
  send: ClientEvent<Send, SendCallback>;
  retrieve: ClientEvent<Retrieve, RetrieveCallback>;
}
