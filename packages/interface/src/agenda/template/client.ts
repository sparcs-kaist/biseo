/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import {
  AgendaTemplate,
  AgendaTemplateCreate,
  AgendaTemplateUpdate,
} from "./common";

/**
 * Create
 * description
 */
export const Create = AgendaTemplateCreate;
export type Create = z.infer<typeof Create>;
export const CreateCb = z.object({});
export type CreateCb = z.infer<typeof CreateCb>;

/**
 * RetrieveAll
 * description
 */
export const RetrieveAll = z.object({});
export type RetrieveAll = z.infer<typeof RetrieveAll>;
export const RetrieveAllCb = z.array(AgendaTemplate);
export type RetrieveAllCb = z.infer<typeof RetrieveAllCb>;

/**
 * Update
 * description
 */
export const Update = AgendaTemplateUpdate;
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
