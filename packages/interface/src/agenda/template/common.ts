/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";

/**
 * AgendaTemplate
 * some description about agenda template schema goes here
 */
export const AgendaTemplate = z.object({
  id: z.number(),
  templateName: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  resolution: z.string().min(1),
  choices: z.array(z.string()).min(1),
});
export type AgendaTemplate = z.infer<typeof AgendaTemplate>;

/**
 * AgendaTemplateCreate
 * some description about agenda template create schema goes here
 */
export const AgendaTemplateCreate = z.object({
  templateName: z.string().min(1).max(255),
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  resolution: z.string().min(1).max(255),
  choices: z.array(z.string().min(1).max(255)),
});
export type AgendaTemplateCreate = z.infer<typeof AgendaTemplateCreate>;

/**
 * AgendaTemplateUpdate
 * some description about agenda template update schema goes here
 */
export const AgendaTemplateUpdate = AgendaTemplateCreate.extend({
  id: z.number(),
});
export type AgendaTemplateUpdate = z.infer<typeof AgendaTemplateUpdate>;
