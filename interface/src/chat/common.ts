/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { ChatUser } from "../user";

/**
 * Message
 * some description about message schema goes here
 */
export const Message = z.object({
  id: z.number(),
  user: ChatUser,
  type: z.enum(["message", "notice"]),
  message: z.string().min(1).max(500),
  createdAt: z.string().datetime(),
});
export type Message = z.infer<typeof Message>;
