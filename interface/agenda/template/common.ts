import { z } from "zod";

/**
 * AgendaTemplate
 * some description about agenda template schema goes here
 */
export const AgendaTemplate = z.object({
  id: z.number(),
  templateName: z.string(),
  title: z.string(),
  content: z.string(),
  resolution: z.string(),
  choices: z.array(z.string()),
});
export type AgendaTemplate = z.infer<typeof AgendaTemplate>;

/**
 * AgendaTemplateCreate
 * some description about agenda template create schema goes here
 */
export const AgendaTemplateCreate = z.object({
  templateName: z.string(),
  title: z.string(),
  content: z.string(),
  resolution: z.string(),
  choices: z.array(z.string()),
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
