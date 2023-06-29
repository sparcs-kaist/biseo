import { z } from "zod";

export const Init = z.object({
  nickname: z.string(),
  isAdmin: z.boolean(),
});
export type Init = z.infer<typeof Init>;
