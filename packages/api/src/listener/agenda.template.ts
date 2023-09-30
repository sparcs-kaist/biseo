import * as schema from "@biseo/interface/agenda/template";

import {
  createTemplate,
  retrieveAll,
  updateTemplate,
  deleteTemplate,
} from "@biseo/api/service/agenda.template";

import { Router } from "@biseo/api/lib/listener";

const router = Router();

router.on("agenda.template.create", schema.Create, async (req, { io }) => {
  const { templateWithChoices } = await createTemplate(req);

  io.emit("agenda.template.created", templateWithChoices);
  return {};
});

router.on("agenda.template.retrieveAll", schema.RetrieveAll, retrieveAll);

router.on("agenda.template.update", schema.Update, async (req, { io }) => {
  const { templateWithChoices } = await updateTemplate(req);

  io.emit("agenda.template.updated", templateWithChoices);
  return {};
});

router.on("agenda.template.delete", schema.Delete, async (req, { io }) => {
  const deletedTemplate = await deleteTemplate(req);

  io.emit("agenda.template.deleted", deletedTemplate);
  return {};
});

export { router as agendaTemplateRouter };
