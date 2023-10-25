/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { User } from "@biseo/interface/user";
import { AgendaStatus, ChoiceWithResult } from "@biseo/interface/agenda";
import { AdminAgenda } from "./common";

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
  status: AgendaStatus,
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
  // choices: z.array(AdminChoice),
  choices: z.array(ChoiceWithResult),
  voters: z.object({
    voted: z.array(User),
    total: z.array(User),
  }),
});
export type Voted = z.infer<typeof Voted>;
