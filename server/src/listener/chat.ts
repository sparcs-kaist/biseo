import type { BiseoServer, BiseoSocket } from "@/types/socket";
import * as schema from "@/interface/chat";
import { send, retrieve } from "@/service/chat";
import { BiseoError, BiseoResponse } from "../utils";

export const chatListener = (io: BiseoServer, socket: BiseoSocket): void => {
  socket.on("chat.send", async (req, callback) => {
    try {
      schema.Send.parse(req);
      // TODO: retreive current user info from socket
    } catch (err) {
      return callback(BiseoError("bad request"));
    }

    const res = await send(req);
    if (!res) return callback(BiseoError("failed to send chat"));

    io.emit("chat.received", res);
    callback(BiseoResponse({}));
  });

  socket.on("chat.retrieve", async (req, callback) => {
    try {
      schema.Retrieve.parse(req);
    } catch (err) {
      return callback(BiseoError("bad request"));
    }

    const res = await retrieve(req);
    if (!res) return callback(BiseoError("failed to retrieve chat"));

    callback(BiseoResponse(res));
  });
};
