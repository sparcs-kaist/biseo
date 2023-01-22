import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { adminAgendaListener } from "@/listener/admin.agenda";
import type { BiseoServer } from "./types";

const app = express();
const httpServer = createServer(app);
const io: BiseoServer = new Server(httpServer, {
  cors: { origin: "*" },
});
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  adminAgendaListener(io, socket);
});

httpServer.listen(port);
