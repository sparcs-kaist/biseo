import { z } from "zod";
import { UserTagi } from "./common";

/**
 * Created
 * description
 */
export const Created = UserTagi;
export type Created = z.infer<typeof Created>;

/**
 * Updated
 * description
 */
export const Updated = UserTagi;
export type Updated = z.infer<typeof Updated>;

/**
 * Deleted
 * description
 */
export const Deleted = z.object({
  id: z.number(),
});
export type Deleted = z.infer<typeof Deleted>;
