/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { AgendaBase, AgendaStatus, ChoiceWithResult } from "@/agenda";
import { User } from "@/user";

/**
 * AdminAgendaStatus
 * some description about admin agenda status type goes here
 */
export const AdminAgendaStatus = z.enum(AgendaStatus.options);
export type AdminAgendaStatus = z.infer<typeof AdminAgendaStatus>;

/**
 * AdminAgenda
 * some description about admin agenda schema goes here
 */
export const AdminAgenda = AgendaBase.extend({
  status: AdminAgendaStatus,
  voters: z.object({
    voted: z.array(User),
    total: z.array(User),
  }),
  choices: z.array(ChoiceWithResult),
  startAt: z.string(), // currently used only on terminated admin agendas
});
export type AdminAgenda = z.infer<typeof AdminAgenda>;

/**
 * AdminAgendaCreate
 * some description about admin agenda create schema goes here
 */
export const AdminAgendaCreate = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  resolution: z.string().min(1).max(255),
  type: z.object({
    named: z.boolean(),
    public: z.boolean(),
  }),
  choices: z.array(z.string().min(1).max(255)).min(1),
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
