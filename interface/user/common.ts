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

/**
 * UserTag
 * some description about user tag type goes here
 */
export const UserTag = z.object({
  type: z.enum(["regular", "associate"]),
});
export type UserTag = z.infer<typeof UserTag>;
