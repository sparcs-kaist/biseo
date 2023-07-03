import * as schema from "biseo-interface/admin/agenda";
import {
  agendaCreate,
  agendaDelete,
  agendaStatusUpdate,
  agendaUpdate,
  remind,
  retrieveAll,
} from "@/service/admin.agenda";
import { BiseoError } from "@/lib/error";

import { Router } from "@/lib/listener";

const router = Router();

router.on("admin.agenda.create", schema.Create, async (req, { io, socket }) => {
  const res = await agendaCreate(req);
  if (!res) throw new BiseoError("failed to create an agenda");
  io.to("admin").emit("admin.agenda.created", res);
  return {};
});

router.on("admin.agenda.delete", schema.Delete, async (req, { io }) => {
  const res = await agendaDelete(req);
  if (!res) throw new BiseoError("failed to delete the agenda");

  io.to("admin").emit("admin.agenda.deleted", res);
  return {};
});

router.on("admin.agenda.statusUpdate", schema.StatusUpdate, async (req, { io }) => {
  const res = await agendaStatusUpdate(req);
  if (!res) throw new BiseoError("failed to update status the agenda");
  io.to("admin").emit("admin.agenda.statusUpdated", res);
  return {};
});

router.on("admin.agenda.update", schema.Update, async (req, { io }) => {
  const res = await agendaUpdate(req);
  if (!res) throw new BiseoError("failed to update the agenda");

  io.to("admin").emit("admin.agenda.updated", res);
  return {};
});

router.on("admin.agenda.remind", schema.Remind, async (req, { io }) => {
  const res = await remind(req);
  if (!res) throw new BiseoError("failed to remind about agenda");

  //Implement unvoters emit
  //io.to("unvoters").emit("agenda.reminded", ??? );
  return {};
});

router.on("admin.agenda.retrieveAll", schema.RetrieveAll, async (req, { io }) => {
  const res = await retrieveAll();
  if (!res) throw new BiseoError("failed to update the agenda");

  return res;
});

export { router as adminAgendaRouter };
