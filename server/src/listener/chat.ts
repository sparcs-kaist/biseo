import * as schema from "biseo-interface/chat";
import { send, retrieve } from "@/service/chat";

import { Router } from "@/lib/listener";

const router = Router();

router.on("chat.send", schema.Send, async (req, { io }) => {
  io.emit("chat.received", await send(req));
  return {};
});

export { router as chatRouter };

// export const chatListener = (io: BiseoServer, socket: BiseoSocket): void => {
//   socket.on("chat.send", async (req, callback) => {
//     try {
//       schema.Send.parse(req);
//       // TODO: retreive current user info from socket
//     } catch (err) {
//       return callback(BiseoError("bad request"));
//     }

//     callback(BiseoResponse({}));
//   });

//   socket.on("chat.retrieve", async (req, callback) => {
//     try {
//       schema.Retrieve.parse(req);
//     } catch (err) {
//       return callback(BiseoError("bad request"));
//     }

//     const res = await retrieve(req);
//     if (!res) return callback(BiseoError("failed to retrieve chat"));

//     callback(BiseoResponse(res));
//   });
// };
