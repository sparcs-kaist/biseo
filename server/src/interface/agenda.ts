import { z } from "zod";

export const choiceSchema = z.object({
  id: z.number(),
  name: z.string(),
  voters: z.array(z.number()),
});

const statusSchema = z.enum(["prepare", "progress", "terminate"]);

export const agendaSchema = z.object({
  id: z.number(),
  title: z.string(),
  subtitle: z.string(),
  content: z.string(),
  choices: z.array(choiceSchema),
  voters: z.array(z.number()),
  status: statusSchema,
});

export const createRequestSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  content: z.string(),
  choices: z.array(z.string()),
  voters: z.array(z.number()),
});
