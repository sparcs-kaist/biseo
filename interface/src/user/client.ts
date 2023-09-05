/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";

/**
 * Enter
 * description
 */
export const Enter = z.object({});
export type Enter = z.infer<typeof Enter>;
export const EnterCb = z.object({});
export type EnterCb = z.infer<typeof EnterCb>;

/**
 * Leave
 * description
 */
export const Leave = z.object({});
export type Leave = z.infer<typeof Leave>;
export const LeaveCb = z.object({});
export type LeaveCb = z.infer<typeof LeaveCb>;
