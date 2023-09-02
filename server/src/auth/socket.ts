import type { ExtendedError } from "socket.io/dist/namespace";
import type { BiseoSocket } from "@/types/socket";
import { getUserFromToken } from "@/auth/token";

const handler = async (socket: BiseoSocket) => {
  const user = await getUserFromToken(socket.handshake.auth.token);
  if (!user) throw new Error("invalid token");

  socket.data.user = user;
  socket.join(`user/${user.username}`);
  if (user.isAdmin) socket.join("admin");

  return socket.emit("init", user);
};

export const auth = (
  socket: BiseoSocket,
  next: (err?: ExtendedError) => void,
) => {
  handler(socket)
    .then(() => next())
    .catch(e => {
      socket.disconnect();
      next(e);
    });
};
