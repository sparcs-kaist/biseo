import * as schema from "biseo-interface/admin/user";
import { retrieveAll } from "@/service/admin.user";

import { Router } from "@/lib/listener";

const router = Router();

router.on("admin.user.retrieveAll", schema.RetrieveAll, async req => {
  return await retrieveAll();
});

export { router as adminUserRouter };
