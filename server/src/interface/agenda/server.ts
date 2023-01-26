import { z } from "zod";
import type { ServerEvent } from "../helpers";
import { OngoingAgenda, TerminatedAgenda } from "./common";

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
 * Reminded
 * description
 */
export const Reminded = z.object({
  agendaId: z.number(),
  message: z.string(),
});
export type Reminded = z.infer<typeof Reminded>;

export interface ServerEvents {
  started: ServerEvent<Started>;
  voted: ServerEvent<Voted>;
  terminated: ServerEvent<Terminated>;
  reminded: ServerEvent<Reminded>;
}
