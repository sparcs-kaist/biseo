import * as schema from "biseo-interface/agenda";
import { retrieveAll, vote } from "@/service/agenda";
import { BiseoError } from "@/lib/error";

import { Router } from "@/lib/listener";

const router = Router();

router.on(
  "agenda.retrieveAll",
  schema.RetrieveAll,
  async (req, { io, user }) => {
    return retrieveAll(req, user);
  }
);

router.on("agenda.vote", schema.Vote, async (req, { io, user }) => {
  await vote(req, io, user);
  return {};
});

export { router as agendaRouter };
