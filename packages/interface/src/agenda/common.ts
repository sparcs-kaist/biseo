/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
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
 * VoteInfo
 * some description about vote info schema goes here
 */
export const VoteInfo = Choice.extend({
  voterid: z.number(),
  choiceid: z.number(),
});
export type VoteInfo = z.infer<typeof VoteInfo>;
/**
 * VoteInfo
 * some description about vote info schema goes here
 */
export const AgendaType = Choice.extend({
  id: z.number(),
  agendaId: z.number(),
  named: z.boolean(),
  private: z.boolean(),
  voteInfo: z.array(VoteInfo),
});
export type AgendaType = z.infer<typeof AgendaType>;

/**
 * AgendaBase
 * some description about agenda base schema goes here
 */
export const AgendaBase = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  type: AgendaType,
  resolution: z.string(),
  status: z.never(), // Must be overridden
  voters: z.object({
    voted: z.number(),
    total: z.number(),
  }),
});
export type AgendaBase = z.infer<typeof AgendaBase>;

/**
 * PreparingAgenda
 * some description about preparing agenda schema goes here
 */
export const PreparingAgenda = AgendaBase.extend({
  status: z.literal("preparing"),
  user: z.object({
    votable: z.boolean(),
  }),
  choices: z.array(Choice),
});
export type PreparingAgenda = z.infer<typeof PreparingAgenda>;

/**
 * OngoingAgenda
 * some description about ongoing agenda schema goes here
 */
export const OngoingAgenda = AgendaBase.extend({
  status: z.literal("ongoing"),
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
  status: z.literal("terminated"),
  user: z.object({
    votable: z.boolean(),
    voted: z.number().nullable(), // choiceId | null
  }),
  choices: z.array(ChoiceWithResult),
  endAt: z.string(),
});
export type TerminatedAgenda = z.infer<typeof TerminatedAgenda>;

/**
 * Agenda
 * some description about agenda type goes here
 */
export const Agenda = z.union([
  PreparingAgenda,
  OngoingAgenda,
  TerminatedAgenda,
]);
export type Agenda = z.infer<typeof Agenda>;

/**
 * AgendaStatus
 * some description about agenda status type goes here
 */
export const AgendaStatus = z.enum(["preparing", "ongoing", "terminated"]);
export type AgendaStatus = z.infer<typeof AgendaStatus>;
