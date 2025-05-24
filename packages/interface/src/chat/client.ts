/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { Message, MessageType } from "./common";

/**
 * Send
 * description
 */
export const Send = z.object({
  message: z.string().min(1).max(500),
  type: MessageType,
});
export type Send = z.infer<typeof Send>;
export const SendCb = Message;
export type SendCb = z.infer<typeof SendCb>;

/**
 * Modify(or Update)
 * description
 */

export const Update = z.object({
  id: z.number(),
  type: MessageType,
});
export type Update = z.infer<typeof Update>;
export const UpdateCb = Message;
export type UpdateCb = z.infer<typeof UpdateCb>;

/**
 * Retrieve
 * description
 */
export const Retrieve = z.object({
  lastChatId: z.number().nullable(),
  limit: z.number(),
});
export type Retrieve = z.infer<typeof Retrieve>;
export const RetrieveCb = z.array(Message);
export type RetrieveCb = z.infer<typeof RetrieveCb>;
