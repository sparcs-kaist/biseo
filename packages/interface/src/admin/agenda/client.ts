/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { AgendaStatus } from "@biseo/interface/agenda";
import { AdminAgenda, AdminAgendaCreate, AdminAgendaUpdate } from "./common";

/**
 * Create
 * description
 */
export const Create = AdminAgendaCreate;
export type Create = z.infer<typeof Create>;
export const CreateCb = z.object({});
export type CreateCb = z.infer<typeof CreateCb>;

/**
 * RetrieveAll
 * description
 */
export const RetrieveAll = z.object({});
export type RetrieveAll = z.infer<typeof RetrieveAll>;
export const RetrieveAllCb = z.array(AdminAgenda);
export type RetrieveAllCb = z.infer<typeof RetrieveAllCb>;

/**
 * StatusUpdate
 * description
 */
export const StatusUpdate = z.object({
  id: z.number(),
  status: AgendaStatus,
});
export type StatusUpdate = z.infer<typeof StatusUpdate>;
export const StatusUpdateCb = z.object({});
export type StatusUpdateCb = z.infer<typeof StatusUpdateCb>;

/**
 * Update
 * description
 */
export const Update = AdminAgendaUpdate;
export type Update = z.infer<typeof Update>;
export const UpdateCb = z.object({});
export type UpdateCb = z.infer<typeof UpdateCb>;

/**
 * Delete
 * description
 */
export const Delete = z.object({
  id: z.number(),
});
export type Delete = z.infer<typeof Delete>;
export const DeleteCb = z.object({});
export type DeleteCb = z.infer<typeof DeleteCb>;

/**
 * Remind
 * description
 */
export const Remind = z.object({
  id: z.number(),
});
export type Remind = z.infer<typeof Remind>;
export const RemindCb = z.object({});
export type RemindCb = z.infer<typeof RemindCb>;
