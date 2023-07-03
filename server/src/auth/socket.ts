import type { ExtendedError } from "socket.io/dist/namespace";
import type { BiseoSocket } from "@/types/socket";
import { getUserFromToken } from "@/auth/token";

export const auth = (socket: BiseoSocket, next: (err?: ExtendedError) => void) => {
  handler(socket)
    .then(() => next())
    .catch(e => {
      socket.disconnect();
      next(e);
    });
};

const handler = async (socket: BiseoSocket) => {
  const user = await getUserFromToken(socket.handshake.auth.token);
  if (!user) throw new Error("invalid token");
  socket.join(user.username);
  return socket.emit("init", user);
};
