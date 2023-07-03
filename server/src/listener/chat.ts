import * as schema from "biseo-interface/chat";
import { send, retrieve } from "@/service/chat";

import { Router } from "@/lib/listener";

const router = Router();

router.on("chat.send", schema.Send, async (req, { io }) => {
  io.emit("chat.received", await send(req));
  return {};
});

router.on("chat.retrieve", schema.Retrieve, async (req, { io }) => {
  return await retrieve(req);
});

export { router as chatRouter };
