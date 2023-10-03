import type { BiseoSocket } from "@biseo/api/types/socket";
import { getUserFromToken } from "@biseo/api/auth/token";

const handler = async (socket: BiseoSocket) => {
  const user = await getUserFromToken(socket.handshake.auth.token);
  if (!user) throw new Error("invalid token");

  socket.data.user = user;
  socket.join(`user/${user.username}`);
  if (user.isAdmin) socket.join("admin");

  return socket.emit("init", user);
};

export const auth = (socket: BiseoSocket, next: (err?: Error) => void) => {
  handler(socket)
    .then(() => next())
    .catch(e => {
      socket.disconnect();
      next(e);
    });
};
