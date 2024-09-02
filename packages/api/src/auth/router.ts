import { Router } from "express";
import { loginHandler, gLoginHandler } from "./login";

const router = Router();

router.post("/login", (req, res, next) => {
  loginHandler(req, res).catch(next);
});
router.post("/glogin", (req, res, next) => {
  gLoginHandler(req, res).catch(next);
});

export { router as authRouter };
