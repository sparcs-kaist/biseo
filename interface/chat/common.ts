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
  message: z.string(),
  createdAt: z.date(),
});
export type Message = z.infer<typeof Message>;
