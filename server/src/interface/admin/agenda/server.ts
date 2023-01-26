import { z } from "zod";
import type { ServerEvent } from "../../helpers";
import { AdminAgenda, AdminChoice } from "./common";
import { User } from "../../user/common";

/**
 * Created
 * description
 */
export const Created = AdminAgenda;
export type Created = z.infer<typeof Created>;

/**
 * StatusUpdated
 * description
 */
export const StatusUpdated = z.object({
  id: z.number(),
});
export type StatusUpdated = z.infer<typeof StatusUpdated>;

/**
 * Updated
 * description
 */
export const Updated = AdminAgenda;
export type Updated = z.infer<typeof Updated>;

/**
 * Deleted
 * description
 */
export const Deleted = z.object({
  id: z.number(),
});
export type Deleted = z.infer<typeof Deleted>;

/**
 * Voted
 * description
 */
export const Voted = z.object({
  id: z.number(),
  choices: z.array(AdminChoice),
  voters: z.object({
    voted: z.array(User),
    total: z.array(User),
  }),
});
export type Voted = z.infer<typeof Voted>;

export interface ServerEvents {
  created: ServerEvent<Created>;
  statusUpdated: ServerEvent<StatusUpdated>;
  updated: ServerEvent<Updated>;
  deleted: ServerEvent<Deleted>;
  voted: ServerEvent<Created>;
}
