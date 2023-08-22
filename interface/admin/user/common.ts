import { z } from "zod";
import { User } from "../../user";

/**
 * UserTag
 * some description about user tag type goes here
 */
export const UserTag = z.object({
  type: z.enum(["regular", "associate"]),
});
export type UserTag = z.infer<typeof UserTag>;

/**
 * AdminUser
 * some description about admin user type goes here
 */
export const AdminUser = User.extend({
  isAdmin: z.boolean(),
  tags: z.array(UserTag),
});
export type AdminUser = z.infer<typeof AdminUser>;
