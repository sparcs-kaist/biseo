/* eslint-disable @typescript-eslint/no-redeclare -- A Zod schema name and type should have the same names */
import { z } from "zod";
import { Message } from "./common";

/**
 * Recieved
 * description
 */
export const Received = Message;
export type Received = z.infer<typeof Received>;
