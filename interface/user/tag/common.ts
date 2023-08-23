import { z } from "zod";
import { User } from "../common";

/**
 * UserTag
 * some description about user tag type goes here
 */
export const UserTag = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  users: z.array(User),
});
export type UserTag = z.infer<typeof UserTag>;

/**
 * AdminAgendaCreate
 * some description about user tag create schema goes here
 */
export const UserTagCreate = z.object({
  title: z.string(),
  description: z.string(),
  users: z.array(User),
});
export type UserTagCreate = z.infer<typeof UserTagCreate>;

/**
 * UserTagUpdate
 * some description about user tag update schema goes here
 */
export const UserTagUpdate = UserTagCreate.extend({
  id: z.number(),
});
export type UserTagUpdate = z.infer<typeof UserTagUpdate>;
