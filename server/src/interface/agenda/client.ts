import { z } from "zod";
import type { ClientEvent } from "../helpers";
import { Agenda } from "./common";

/**
 * RetrieveAll
 * description
 */
export const RetrieveAll = z.object({});
export type RetrieveAll = z.infer<typeof RetrieveAll>;
export const RetrieveAllCallback = z.array(Agenda);
export type RetrieveAllCallback = z.infer<typeof RetrieveAllCallback>;

/**
 * Vote
 * description
 */
export const Vote = z.object({
  choiceId: z.number(),
});
export type Vote = z.infer<typeof Vote>;
export const VoteCallback = z.object({});
export type VoteCallback = z.infer<typeof VoteCallback>;

export interface ClientEvents {
  retrieveAll: ClientEvent<RetrieveAll, RetrieveAllCallback>;
  vote: ClientEvent<Vote, VoteCallback>;
}
