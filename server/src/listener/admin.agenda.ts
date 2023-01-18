import { type Server, type Socket } from "socket.io";
import { Request } from "../../../socket/io";
import { type Create } from "../../../socket/admin.agenda";
import { createRequestSchema } from "@/model/agenda";
import { agendaCreate } from "@/service/admin.agenda";
import httpStatus from "http-status";

export const adminAgendaListener = (io: Server, socket: Socket): void => {
  socket.on(
    "admin/agenda/create",
    async (
      req: Request<Create>,
      callback: (statusCode: number, message?: string) => void
    ) => {
      try {
        createRequestSchema.parse(req);
      } catch (err) {
        callback(httpStatus.BAD_REQUEST);
        return;
      }

      const res = await agendaCreate(req);

      if (res === null) {
        callback(
          httpStatus.INTERNAL_SERVER_ERROR,
          "failed to create an agenda"
        );
        return;
      }

      io.to("admin").emit("admin/agenda/create", res);
    }
  );
};
