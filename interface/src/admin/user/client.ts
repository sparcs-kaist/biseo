/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { AdminUser } from "./common";

/**
 * RetrieveAll
 * description
 */
export const RetrieveAll = z.object({});
export type RetrieveAll = z.infer<typeof RetrieveAll>;
export const RetrieveAllCb = z.array(AdminUser);
export type RetrieveAllCb = z.infer<typeof RetrieveAllCb>;
