import * as schema from "@biseo/interface/user/tag";

import {
  createTag,
  retrieveAll,
  updateTag,
  deleteTag,
} from "@biseo/api/service/user.tag";

import { Router } from "@biseo/api/lib/listener";

const router = Router();

router.on("user.tag.create", schema.Create, async (req, { io }) => {
  const { tagWithUsers } = await createTag(req);

  io.emit("user.tag.created", tagWithUsers);
  return {};
});

router.on("user.tag.retrieveAll", schema.RetrieveAll, retrieveAll);

router.on("user.tag.update", schema.Update, async (req, { io }) => {
  const { tagWithUsers } = await updateTag(req);

  io.emit("user.tag.updated", tagWithUsers);
  return {};
});

router.on("user.tag.delete", schema.Delete, async (req, { io }) => {
  const deletedTag = await deleteTag(req);

  io.emit("user.tag.deleted", deletedTag);
  return {};
});

export { router as userTagRouter };
