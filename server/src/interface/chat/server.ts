import { z } from "zod";

import { Message } from "./common";
import { ServerEvent } from "../helpers";

export const Received = Message;
export type Received = z.infer<typeof Received>;

export interface ServerToClientEvents {
  received: ServerEvent<Received>;
}
