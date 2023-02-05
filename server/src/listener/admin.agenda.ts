import type { BiseoServer, BiseoSocket } from "@/types/socket";
import * as schema from "@/interface/admin/agenda";
import {
  agendaCreate,
  agendaDelete,
  agendaStatusUpdate,
  agendaUpdate,
  remind,
  retrieveAll,
} from "@/service/admin.agenda";
import { BiseoError, BiseoResponse } from "../utils";

export const adminAgendaListener = (
  io: BiseoServer,
  socket: BiseoSocket
): void => {
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

  socket.on("admin.agenda.delete", async (req, callback) => {
    try {
      schema.Delete.parse(req);
    } catch (err) {
      return callback(BiseoError("Bad request"));
    }

    const res = await agendaDelete(req);
    if (!res) return callback(BiseoError("failed to delete the agenda"));

    io.to("admin").emit("admin.agenda.deleted", res);
    callback(BiseoResponse({}));
  });

  socket.on("admin.agenda.statusUpdate", async (req, callback) => {
    try {
      schema.StatusUpdate.parse(req);
    } catch (err) {
      return callback(BiseoError("Bad request"));
    }

    const res = await agendaStatusUpdate(req);
    if (!res) return callback(BiseoError("failed to update status the agenda"));

    io.to("admin").emit("admin.agenda.statusUpdated", res);
    callback(BiseoResponse({}));
  });

  socket.on("admin.agenda.update", async (req, callback) => {
    try {
      schema.Update.parse(req);
    } catch (err) {
      return callback(BiseoError("Bad request"));
    }

    const res = await agendaUpdate(req);
    if (!res) return callback(BiseoError("failed to update the agenda"));

    io.to("admin").emit("admin.agenda.updated", res);
    callback(BiseoResponse({}));
  });

  socket.on("admin.agenda.retrieveAll", async (req, callback) => {
    const res = await retrieveAll();
    if (!res) return callback(BiseoError("failed to update the agenda"));

    callback(BiseoResponse(res));
  });

  socket.on("admin.agenda.remind", async (req, callback) => {
    const res = await remind(req);
    if (!res) return callback(BiseoError("failed to remind about agenda"));

    //Implement unvoters emit
    //io.to("unvoters").emit("agenda.reminded", ??? );
    callback(BiseoResponse({}));
  });
};
