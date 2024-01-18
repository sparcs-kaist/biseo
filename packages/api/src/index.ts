import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";

import type { BiseoServer } from "@biseo/api/types/socket";
import { authRouter } from "@biseo/api/auth/router";
import { env } from "@biseo/api/env";
import logger from "@biseo/api/utils/logger";

import { auth } from "@biseo/api/auth/socket";

import { adminAgendaRouter } from "@biseo/api/listener/admin.agenda";
import { adminUserRouter } from "@biseo/api/listener/admin.user";
import { chatRouter } from "@biseo/api/listener/chat";
import { agendaRouter } from "@biseo/api/listener/agenda";
import { agendaTemplateRouter } from "@biseo/api/listener/agenda.template";
import { userTagRouter } from "@biseo/api/listener/user.tag";

const corsOrigin =
  env.NODE_ENV === "development" ? "*" : [/sparcs\.org$/, /kaist\.ac\.kr$/];

const app = express();
const httpServer = createServer(app);
const io: BiseoServer = new Server(httpServer, {
  path: "/api/socket",
  cors: { origin: corsOrigin },
});
const port = env.SERVER_PORT ?? 8000;

app.use(express.json());
app.use(cors({ origin: corsOrigin }));

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

io.use(auth);

io.on("connection", socket => {
  adminAgendaRouter.register(io, socket);
  adminUserRouter.register(io, socket);
  chatRouter.register(io, socket);
  agendaRouter.register(io, socket);
  agendaTemplateRouter.register(io, socket);
  userTagRouter.register(io, socket);
});

httpServer.listen(port);
logger.info(`Server listening on port ${port}`);
