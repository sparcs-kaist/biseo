import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { adminAgendaRouter } from "@/listener/admin.agenda";
import type { BiseoServer } from "@/types/socket";
import { authRouter } from "./auth/login";
import { env } from "./env";
import { verifyToken } from "./auth/token";

const app = express();
const httpServer = createServer(app);
const io: BiseoServer = new Server(httpServer, {
  path: "/api/socket",
  cors: { origin: "*" },
});
const port = env.SERVER_PORT ?? 8000;

app.use(express.json());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRouter);

io.use((socket, next) => {
  const nickname = verifyToken(socket.handshake.auth.token);

  if (!nickname) {
    next(new Error("invalid token"));
    return socket.disconnect();
  }

  // TODO: check if user is admin
  socket.emit("init", { nickname, isAdmin: false });
  next();
});

io.on("connection", (socket) => {

  adminAgendaRouter.register(io, socket);
});

httpServer.listen(port);
console.log(`Server listening on port ${port}`);
