import { z } from "zod";
import { User } from "../../user";

/**
 * AdminUser
 * some description about admin user type goes here
 */
export const AdminUser = User.extend({
  isAdmin: z.boolean(),
  tags: z.array(z.string()), // tag name
});
export type AdminUser = z.infer<typeof AdminUser>;
