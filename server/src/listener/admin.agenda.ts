import * as schema from "biseo-interface/admin/agenda";

import {
  createAgenda,
  startAgenda,
  terminateAgenda,
  updateAgenda,
  deleteAgenda,
  remind,
  retrieveAll,
} from "@/service/admin.agenda";
import { createNotice } from "@/service/chat";

import { BiseoError } from "@/lib/error";

import { Router } from "@/lib/listener";

const router = Router();

router.on("admin.agenda.create", schema.Create, async (req, { io }) => {
  const { voters, agendaVotable, agendaNotVotable, agendaWithVoters } =
    await createAgenda(req);

  io.to(voters).emit("agenda.created", agendaVotable);
  io.except(voters).emit("agenda.created", agendaNotVotable);
  io.to("admin").emit("admin.agenda.created", agendaWithVoters);
  return {};
});

router.on(
  "admin.agenda.statusUpdate",
  schema.StatusUpdate,
  async (req, { io, user }) => {
    switch (req.status) {
      case "ongoing":
        const ongoingAgenda = await startAgenda(req.id, user);
        io.emit("agenda.started", ongoingAgenda);

        const startNotice = await createNotice(ongoingAgenda, user);
        io.emit("chat.received", startNotice);
        break;
      case "terminated":
        const terminatedAgenda = await terminateAgenda(req.id, user);
        io.emit("agenda.terminated", terminatedAgenda);

        const terminateNotice = await createNotice(terminatedAgenda, user);
        io.emit("chat.received", terminateNotice);
        break;
      default:
        return {};
    }

    io.to("admin").emit("admin.agenda.statusUpdated", req);
    return {};
  },
);

router.on("admin.agenda.update", schema.Update, async (req, { io }) => {
  const { voters, agendaVotable, agendaNotVotable, agendaWithVoters } =
    await updateAgenda(req);

  io.to(voters).emit("agenda.updated", agendaVotable);
  io.except(voters).emit("agenda.updated", agendaNotVotable);
  io.to("admin").emit("admin.agenda.updated", agendaWithVoters);
  return {};
});

router.on("admin.agenda.delete", schema.Delete, async (req, { io }) => {
  const res = await deleteAgenda(req);

  io.emit("agenda.deleted", res);
  io.to("admin").emit("admin.agenda.deleted", res);
  return {};
});

router.on("admin.agenda.remind", schema.Remind, async (req, { io }) => {
  const res = await remind(req);
  if (!res) throw new BiseoError("failed to remind about agenda");

  io.to(res.unvotedUsers).emit("agenda.reminded", {
    message: res.message,
    agendaId: res.agendaId,
  });
  return {};
});

router.on("admin.agenda.retrieveAll", schema.RetrieveAll, async req => {
  const res = await retrieveAll();
  if (!res) throw new BiseoError("failed to update the agenda");

  return res;
});

export { router as adminAgendaRouter };
