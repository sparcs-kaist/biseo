import * as schema from "biseo-interface/chat";
import { createMessage, retrieve } from "@/service/chat";

import { Router } from "@/lib/listener";

const router = Router();

router.on("chat.send", schema.Send, async (req, { io, user }) => {
  const message = await createMessage(req, user);
  io.emit("chat.received", message);
  return message;
});

router.on("chat.retrieve", schema.Retrieve, async req => {
  return await retrieve(req);
});

export { router as chatRouter };
