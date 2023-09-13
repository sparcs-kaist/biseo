/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { ChatUser } from "../user";

/** @constant 클라이언트와 서버에서 사용하는 채팅 메시지의 최대 길이를 지정합니다. */
const maxMessageLength = 500;

/**
 * Message
 * some description about message schema goes here
 */
export const Message = z.object({
  id: z.number(),
  user: ChatUser,
  type: z.enum(["message", "notice"]),
  message: z.string().min(1).max(maxMessageLength),
  createdAt: z.string().datetime(),
});
export type Message = z.infer<typeof Message>;
