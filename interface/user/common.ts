import { z } from "zod";

/**
 * User
 * some description about user schema goes here
 */
export const User = z.object({
  id: z.number(),
  username: z.string(),
  displayName: z.string(),
});
export type User = z.infer<typeof User>;

/**
 * ChatUser
 * some description about chat user schema goes here
 */
export const ChatUser = User.omit({
  username: true,
});
export type ChatUser = z.infer<typeof ChatUser>;
