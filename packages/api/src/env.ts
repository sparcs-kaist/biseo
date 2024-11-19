import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  SERVER_PORT: z.coerce.number(),
  SECRET_KEY: z.string(),
  GOOGLE_CLIENT: z.string(),
  GOOGLE_SECRET: z.string(),
});

export const env = schema.parse(process.env);
