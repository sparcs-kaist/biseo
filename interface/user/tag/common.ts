import { z } from "zod";

/**
 * UserTagi
 * some description about user tag type goes here
 */
export const UserTagi = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  users: z.array(z.number()), // user id
});
export type UserTagi = z.infer<typeof UserTagi>;

/**
 * AdminAgendaCreate
 * some description about user tag create schema goes here
 */
export const UserTagCreate = z.object({
  title: z.string(),
  description: z.string(),
  users: z.array(z.number()),
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