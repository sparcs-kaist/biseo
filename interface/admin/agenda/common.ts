import { z } from "zod";
import {
  AgendaBase,
  AgendaStatus,
  Choice,
  ChoiceWithResult,
} from "../../agenda";
import { User } from "../../user";

/**
 * AdminAgendaStatus
 * some description about admin agenda status type goes here
 */
export const AdminAgendaStatus = z.enum([...AgendaStatus.options, "preparing"]);
export type AdminAgendaStatus = z.infer<typeof AdminAgendaStatus>;

/**
 * AdminAgenda
 * some description about admin agenda schema goes here
 */
export const AdminAgenda = AgendaBase.omit({
  voters: true,
  status: true,
}).extend({
  voters: z.object({
    voted: z.array(User),
    total: z.array(User),
  }),
  status: AdminAgendaStatus,
  choices: z.array(ChoiceWithResult),
});
export type AdminAgenda = z.infer<typeof AdminAgenda>;

/**
 * AdminAgendaCreate
 * some description about admin agenda create schema goes here
 */
export const AdminAgendaCreate = z.object({
  title: z.string(),
  content: z.string(),
  resolution: z.string(),
  choices: z.array(z.string()),
  voters: z.object({
    total: z.array(z.number()),
  }),
});
export type AdminAgendaCreate = z.infer<typeof AdminAgendaCreate>;

/**
 * AdminAgendaUpdate
 * some description about admin agenda update schema goes here
 */
export const AdminAgendaUpdate = AdminAgendaCreate.extend({
  id: z.number(),
});
export type AdminAgendaUpdate = z.infer<typeof AdminAgendaUpdate>;
