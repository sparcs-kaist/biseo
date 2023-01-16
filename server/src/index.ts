import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { adminAgendaListener } from "@/listener/admin.agenda";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  adminAgendaListener(io, socket);
});

httpServer.listen(port);
