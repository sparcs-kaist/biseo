/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { User } from "./common";

/**
 * Entered
 * description
 */
export const Entered = User;
export type Entered = z.infer<typeof Entered>;

/**
 * Left
 * description
 */
export const Left = z.object({
  id: z.number(),
});
export type Left = z.infer<typeof Left>;
