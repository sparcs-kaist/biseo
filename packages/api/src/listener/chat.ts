import * as schema from "@biseo/interface/chat";
import {
  createMessage,
  retrieve,
  modifyMessage,
  retrieveAdminNotice,
} from "@biseo/api/service/chat";

import { Router } from "@biseo/api/lib/listener";

const router = Router();

router.on("chat.send", schema.Send, async (req, { io, user }) => {
  const message = await createMessage(req, user);
  io.emit("chat.received", message);
  return message;
});

router.on("chat.update", schema.Update, async (req, body) => {
  const message = await modifyMessage(req);
  body.io.emit("chat.updated", message);
  return message;
});

router.on("chat.retrieve", schema.Retrieve, async req => retrieve(req));
router.on("chat.retrieveAdminNotice", schema.Retrieve, async req =>
  retrieveAdminNotice(req),
);

export { router as chatRouter };
