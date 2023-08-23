import { z } from "zod";
import { AgendaTemplate } from "./common";

/**
 * Created
 * description
 */
export const Created = AgendaTemplate;
export type Created = z.infer<typeof Created>;

/**
 * Updated
 * description
 */
export const Updated = AgendaTemplate;
export type Updated = z.infer<typeof Updated>;

/**
 * Deleted
 * description
 */
export const Deleted = z.object({
  id: z.number(),
});
export type Deleted = z.infer<typeof Deleted>;
