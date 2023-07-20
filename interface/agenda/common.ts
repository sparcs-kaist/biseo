import { z } from "zod";

/**
 * Choice
 * some description about choice schema goes here
 */
export const Choice = z.object({
  id: z.number(),
  name: z.string(),
});
export type Choice = z.infer<typeof Choice>;

/**
 * ChoiceWithResult
 * some description about choice with result schema goes here
 */
export const ChoiceWithResult = Choice.extend({
  count: z.number(),
});
export type ChoiceWithResult = z.infer<typeof ChoiceWithResult>;

/**
 * AgendaStatus
 * some description about agenda status type goes here
 */
export const AgendaStatus = z.enum(["ongoing", "terminated"]);
export type AgendaStatus = z.infer<typeof AgendaStatus>;

/**
 * AgendaBase
 * some description about agenda base schema goes here
 */
export const AgendaBase = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  resolution: z.string(),
  status: AgendaStatus,
  voters: z.object({
    voted: z.number(),
    total: z.number(),
  }),
});
export type AgendaBase = z.infer<typeof AgendaBase>;

/**
 * OngoingAgenda
 * some description about ongoing agenda schema goes here
 */
export const OngoingAgenda = AgendaBase.extend({
  status: z.enum(["ongoing"]),
  user: z.object({
    votable: z.boolean(),
    voted: z.number().nullable(), // choiceId | null
  }),
  choices: z.array(Choice),
});
export type OngoingAgenda = z.infer<typeof OngoingAgenda>;

/**
 * TerminatedAgenda
 * some description about terminated agenda schema goes here
 */
export const TerminatedAgenda = AgendaBase.extend({
  status: z.enum(["terminated"]),
  choices: z.array(ChoiceWithResult),
});
export type TerminatedAgenda = z.infer<typeof TerminatedAgenda>;

/**
 * Agenda
 * some description about agenda type goes here
 */
export const Agenda = z.union([OngoingAgenda, TerminatedAgenda]);
export type Agenda = z.infer<typeof Agenda>;
