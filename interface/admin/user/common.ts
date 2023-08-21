import { z } from "zod";
import { User } from "../../user";

/**
 * AdminUser
 * some description about admin user type goes here
 */
export const AdminUser = User.extend({
  isAdmin: z.boolean(),
  /* TODO: Add tags */
});
export type AdminUser = z.infer<typeof AdminUser>;
