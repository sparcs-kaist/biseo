import * as schema from "biseo-interface/agenda";
import { retrieveAll, vote } from "@/service/agenda";
import { BiseoError } from "@/lib/error";

import { Router } from "@/lib/listener";

const router = Router();

router.on("agenda.retrieveAll", schema.RetrieveAll, async (req, { io }) => {
  const res = await retrieveAll(req);
  if (!res) throw new BiseoError("failed to retrieve agenda");
  return res;
});

router.on("agenda.vote", schema.Vote, async (req, { io }) => {
  const res = await vote(req);
  if (!res) throw new BiseoError("failed to vote");
  return {};
});

export { router as agendaRouter };
