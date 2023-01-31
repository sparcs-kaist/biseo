import type { BiseoServer, BiseoSocket } from "@/types/socket";
import * as schema from "@/interface/admin/agenda";
import { agendaCreate } from "@/service/admin.agenda";
import { BiseoError, BiseoResponse } from "../utils";

export const adminAgendaListener = (io: BiseoServer, socket: BiseoSocket): void => {
  socket.on("admin.agenda.create", async (req, callback) => {
    try {
      schema.Create.parse(req);
    } catch (err) {
      return callback(BiseoError("bad request"));
    }

    const res = await agendaCreate(req);
    if (!res) return callback(BiseoError("failed to create an agenda"));

    io.to("admin").emit("admin.agenda.created", res);
    callback(BiseoResponse({}));
  });
};
