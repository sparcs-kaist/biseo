import type { ClientEventNames, ResponseOf, SchemaOf } from "@biseo/interface";
import type { Res } from "@biseo/interface/helpers";
import { Socket } from "socket.io-client";

export function emitAsync<Ev extends ClientEventNames>(
  this: Socket,
  event: Ev,
  body: SchemaOf<Ev>,
) {
  return new Promise<ResponseOf<Ev>>((resolve, reject) => {
    this.emit(event, body, (res: Res<ResponseOf<Ev>>) => res.ok
      ? resolve(res.data)
      : reject(new Error(res.message)),
    );
  });
}
