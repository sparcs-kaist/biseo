import { z } from "zod";
import { UserTag } from "./common";

/**
 * Created
 * description
 */
export const Created = UserTag;
export type Created = z.infer<typeof Created>;

/**
 * Updated
 * description
 */
export const Updated = UserTag;
export type Updated = z.infer<typeof Updated>;

/**
 * Deleted
 * description
 */
export const Deleted = z.object({
  id: z.number(),
});
export type Deleted = z.infer<typeof Deleted>;
