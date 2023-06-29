import { z } from "zod";
import { Router } from "express";
import asyncHandler from "express-async-handler";

import { authenticate } from "./ldap";
import { getToken } from "./token";

const router = Router();

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

router.post("/login", asyncHandler(async (req, res) => {
  console.log(req.body);
  const result = await loginSchema.spa(req.body);

  if (!result.success) {
    res.status(400).send("Bad request");
    return;
  }

  const username = await authenticate(result.data);
  if (!username) {
    res.status(401).send("Unauthorized");
    return;
  }

  res.json({ token: getToken(username) });
}));

export { router as authRouter };
