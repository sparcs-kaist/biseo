import { z } from "zod";
import { User, UserTag } from "../../user";

/**
 * AdminUser
 * some description about admin user type goes here
 */
export const AdminUser = User.extend({
  isAdmin: z.boolean(),
  tags: z.array(UserTag),
});
export type AdminUser = z.infer<typeof AdminUser>;
