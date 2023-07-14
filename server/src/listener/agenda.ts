import * as schema from "biseo-interface/agenda";
import { BiseoError } from "@/lib/error";

import { Router } from "@/lib/listener";

const router = Router();

router.on("agenda.retrieveAll", schema.RetrieveAll, async (req, { io }) => {
  return {};
});

router.on("agenda.vote", schema.Vote, async (req, { io }) => {
  return {};
});
