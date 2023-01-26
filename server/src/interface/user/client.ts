import { z } from "zod";
import type { ClientEvent } from "../helpers";

/**
 * Enter
 * description
 */
export const Enter = z.object({});
export type Enter = z.infer<typeof Enter>;
export const EnterCallback = z.object({});
export type EnterCallback = z.infer<typeof EnterCallback>;

/**
 * Leave
 * description
 */
export const Leave = z.object({});
export type Leave = z.infer<typeof Leave>;
export const LeaveCallback = z.object({});
export type LeaveCallback = z.infer<typeof LeaveCallback>;

export interface ClientEvents {
  enter: ClientEvent<Enter, EnterCallback>;
  leave: ClientEvent<Leave, LeaveCallback>;
}
