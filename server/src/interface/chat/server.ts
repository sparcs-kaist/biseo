import { z } from "zod";
import { Message } from "./common";

/**
 * Recieved
 * description
 */
export const Received = Message;
export type Received = z.infer<typeof Received>;
