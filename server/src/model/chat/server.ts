import { z } from "zod";

import { messageSchema } from "./common";
import { ServerEvent } from "@socket/helpers";

type Received = z.infer<typeof messageSchema>;

export interface ServerToClientEvents {
  received: ServerEvent<Received>;
}
