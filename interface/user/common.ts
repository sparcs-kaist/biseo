import { z } from "zod";

/**
 * User
 * some description about user schema goes here
 */
export const User = z.object({
  id: z.number(),
  name: z.string(),
  nickname: z.string(),
});
export type User = z.infer<typeof User>;

/**
 * ChatUser
 * some description about chat user schema goes here
 */
export const ChatUser = User.omit({
  name: true,
});
export type ChatUser = z.infer<typeof ChatUser>;
