import * as process from "process";

import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { adminAgendaRouter } from "@/listener/admin.agenda";
import type { BiseoServer } from "@/types/socket";

const app = express();
const httpServer = createServer(app);
const io: BiseoServer = new Server(httpServer, {
  cors: { origin: "*" },
});
const port = process.env.SERVER_PORT ?? 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

adminAgendaRouter.register(io);

httpServer.listen(port);
console.log(`Server listening on port ${port}`);
