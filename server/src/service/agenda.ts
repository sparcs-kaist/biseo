import type { Prisma } from "@prisma/client";
import * as schema from "biseo-interface/agenda";
import { prisma } from "@/db/prisma";

export const retrieveAll = async (): Promise<schema.RetrieveAllCb | null> => {
  const agenda_dbres = await prisma.agenda.findMany({
    where: { deletedAt: null },
    include: {
      voters: true,
      choices: {
        select: {
          id: true,
          name: true,
          users: true,
        },
      },
    },
  });
  const res = agenda_dbres.map((agenda): schema.Agenda => {
    let status: "ongoing" | "preparing" | "terminated" = "ongoing";
    return {
      id: agenda.id,
      title: agenda.title,
      content: agenda.content,
      resolution: agenda.subtitle,
      status: status,
      choices: agenda.choices.map((choice) => {
        return {
          id: choice.id,
          name: choice.name,
        };
      }),
      voters: {
        voted: 0, // TODO
        total: agenda.voters.length,
      },
    };
  });
  return null;
};

export const vote = async ({
  choiceId,
}: schema.Vote): Promise<schema.VoteCb> => {
  return {};
};
