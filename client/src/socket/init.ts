import type { Init } from "@biseo/interface/init";
import { socket } from "./io";

export const initSocket = (token: string) =>
  new Promise<Init>((resolve, reject) => {
    socket.auth = { token };
    socket.connect();

    socket.once("init", resolve);
    socket.once("connect_error", err => {
      socket.disconnect();
      reject(err);
    });
  });
