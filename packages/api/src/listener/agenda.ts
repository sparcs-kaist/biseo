import * as schema from "@biseo/interface/agenda";
import { retrieveAll, editVote, vote } from "@biseo/api/service/agenda";

import { Router } from "@biseo/api/lib/listener";

const router = Router();

router.on("agenda.retrieveAll", schema.RetrieveAll, async (_, { user }) =>
  retrieveAll(user),
);

router.on("agenda.edit", schema.EditVote, async (req, { io, user }) => {
  await editVote(req, io, user);
  return {};
});

router.on("agenda.vote", schema.Vote, async (req, { io, user }) => {
  await vote(req, io, user);
  return {};
});

export { router as agendaRouter };
