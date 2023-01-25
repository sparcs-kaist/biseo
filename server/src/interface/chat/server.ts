import { z } from "zod";
import type { ServerEvent } from "../helpers";

import { Message } from "./common";

export const Received = Message;
export type Received = z.infer<typeof Received>;

export interface ServerEvents {
  received: ServerEvent<Received>;
}