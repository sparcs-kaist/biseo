/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { Agenda } from "./common";

/**
 * RetrieveAll
 * description
 */
export const RetrieveAll = z.object({});
export type RetrieveAll = z.infer<typeof RetrieveAll>;
export const RetrieveAllCb = z.array(Agenda);
export type RetrieveAllCb = z.infer<typeof RetrieveAllCb>;

/**
 * Edit Vote
 * description
 */
export const EditVote = z.object({
  choiceId: z.number(),
  agendaId: z.number(),
});
export type EditVote = z.infer<typeof EditVote>;
export const EditVoteCb = z.object({});
export type EditVoteCb = z.infer<typeof EditVoteCb>;

/**
 * Vote
 * description
 */
export const Vote = z.object({
  choiceId: z.number(),
  agendaId: z.number(),
});
export type Vote = z.infer<typeof Vote>;
export const VoteCb = z.object({});
export type VoteCb = z.infer<typeof VoteCb>;
