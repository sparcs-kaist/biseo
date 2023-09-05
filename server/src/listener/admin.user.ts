import * as schema from "@biseo/interface/admin/user";
import { retrieveAll } from "@/service/admin.user";

import { Router } from "@/lib/listener";

const router = Router();

router.on("admin.user.retrieveAll", schema.RetrieveAll, retrieveAll);

export { router as adminUserRouter };
