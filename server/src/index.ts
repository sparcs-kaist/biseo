import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

import type { BiseoServer } from "@/types/socket";
import { authRouter } from "@/auth/router";
import { env } from "@/env";
import { logger } from "@/utils/logger";

import { auth } from "@/auth/socket";

import { adminAgendaRouter } from "@/listener/admin.agenda";
import { adminUserRouter } from "@/listener/admin.user";
import { chatRouter } from "@/listener/chat";
import { agendaRouter } from "@/listener/agenda";
import { agendaTemplateRouter } from "@/listener/agenda.template";
import { userTagRouter } from "@/listener/user.tag";

const app = express();
const httpServer = createServer(app);
const io: BiseoServer = new Server(httpServer, {
  path: "/api/socket",
  cors: { origin: "*" },
});
const port = env.SERVER_PORT ?? 8000;

app.use(express.json());
app.use(cors());

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
