import { type Server, type Socket } from "socket.io";
import { Request, Response } from "../../../socket/io";
import { type Create } from "../../../socket/admin.agenda";

export const adminAgendaListener = (io: Server, socket: Socket): void => {
  socket.on(
    "admin/agenda/create",
    ({ title, subtitle, content, choices, voters }: Request<Create>) => {
      // TODO: create agenda & save in database

      const res: Response<Create> = {
        id: 1,
        title,
        subtitle,
        content,
        choices: choices.map((el, idx) => ({ id: idx, name: el, voters: [] })),
        voters,
        status: "prepare",
      };

      io.to("admin").emit("admin/agenda/create", res);
    }
  );
};
