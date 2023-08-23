import { z } from "zod";
import { User } from "../../user";
import { UserTag } from "../../user/tag";

/**
 * AdminUser
 * some description about admin user type goes here
 */
export const AdminUser = User.extend({
  isAdmin: z.boolean(),
  tags: z.array(UserTag),
});
export type AdminUser = z.infer<typeof AdminUser>;
