import { z } from "zod";
import type { ServerEvent } from "../helpers";
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

export interface ServerEvents {
  entered: ServerEvent<Entered>;
  left: ServerEvent<Left>;
}
