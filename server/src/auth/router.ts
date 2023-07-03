import { Router } from "express";
import { loginHandler } from "./login";

const router = Router();

router.post("/login", (req, res, next) => {
  loginHandler(req, res).catch(next);
});

export { router as authRouter };
