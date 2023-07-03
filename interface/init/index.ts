import { z } from "zod";

export const Init = z.object({
  id: z.number(),
  username: z.string(),
  displayName: z.string(),
  isAdmin: z.boolean(),
});
export type Init = z.infer<typeof Init>;
