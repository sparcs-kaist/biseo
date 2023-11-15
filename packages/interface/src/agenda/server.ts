/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import {
  OngoingAgenda,
  PreparingAgenda,
  TerminatedAgenda,
  VoteInfo,
} from "./common";

/**
 * Created
 * description
 */
export const Created = PreparingAgenda;
export type Created = z.infer<typeof Created>;

/**
 * Updated
 * description
 */
export const Updated = PreparingAgenda;
export type Updated = z.infer<typeof Created>;

/**
 * Started
 * description
 */
export const Started = OngoingAgenda;
export type Started = z.infer<typeof Started>;

/**
 * Voted
 * description
 */
export const Voted = z.object({
  id: z.number(),
  user: z.object({ voteInfo: VoteInfo }),
  voters: z.object({
    voted: z.number(),
    total: z.number(),
  }),
});
export type Voted = z.infer<typeof Voted>;

/**
 * Terminated
 * description
 */
export const Terminated = TerminatedAgenda;
export type Terminated = z.infer<typeof Terminated>;

/**
 * Deleted
 * description
 */
export const Deleted = z.object({
  id: z.number(),
});
export type Deleted = z.infer<typeof Deleted>;

/**
 * Reminded
 * description
 */
export const Reminded = z.object({
  agendaId: z.number(),
  message: z.string(),
});
export type Reminded = z.infer<typeof Reminded>;
