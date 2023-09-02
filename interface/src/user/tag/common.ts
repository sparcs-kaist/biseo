/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";

/**
 * UserTag
 * some description about user tag type goes here
 */
export const UserTag = z.object({
  id: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  users: z.array(z.number()), // user id
});
export type UserTag = z.infer<typeof UserTag>;

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
