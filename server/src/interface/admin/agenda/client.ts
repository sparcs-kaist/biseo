import { z } from "zod";
import type { ClientEvent } from "../../helpers";
import { AdminAgenda, AdminAgendaCreate, AdminAgendaUpdate } from "./common";
import { AgendaStatus } from "../../agenda/common";

/**
 * Create
 * description
 */
export const Create = AdminAgendaCreate;
export type Create = z.infer<typeof Create>;
export const CreateCallback = z.object({});
export type CreateCallback = z.infer<typeof CreateCallback>;

/**
 * RetrieveAll
 * description
 */
export const RetrieveAll = z.object({});
export type RetrieveAll = z.infer<typeof RetrieveAll>;
export const RetrieveAllCallback = z.array(AdminAgenda);
export type RetrieveAllCallback = z.infer<typeof RetrieveAllCallback>;

/**
 * StatusUpdate
 * description
 */
export const StatusUpdate = z.object({
  id: z.number(),
  status: AgendaStatus,
});
export type StatusUpdate = z.infer<typeof StatusUpdate>;
export const StatusUpdateCallback = z.object({});
export type StatusUpdateCallback = z.infer<typeof StatusUpdateCallback>;

/**
 * Update
 * description
 */
export const Update = AdminAgendaUpdate;
export type Update = z.infer<typeof Update>;
export const UpdateCallback = z.object({});
export type UpdateCallback = z.infer<typeof UpdateCallback>;

/**
 * Delete
 * description
 */
export const Delete = z.object({
  id: z.number(),
});
export type Delete = z.infer<typeof Delete>;
export const DeleteCallback = z.object({});
export type DeleteCallback = z.infer<typeof DeleteCallback>;

/**
 * Remind
 * description
 */
export const Remind = z.object({
  id: z.number(),
});
export type Remind = z.infer<typeof Remind>;
export const RemindCallback = z.object({});
export type RemindCallback = z.infer<typeof RemindCallback>;

export interface ClientEvents {
  create: ClientEvent<Create, CreateCallback>;
  retrieveAll: ClientEvent<RetrieveAll, RetrieveAllCallback>;
  statusUpdate: ClientEvent<StatusUpdate, StatusUpdateCallback>;
  update: ClientEvent<Update, UpdateCallback>;
  delete: ClientEvent<Delete, DeleteCallback>;
  remind: ClientEvent<Remind, RemindCallback>;
}
