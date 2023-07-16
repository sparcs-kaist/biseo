import type { Prisma } from "@prisma/client";
import * as schema from "biseo-interface/agenda";
import { prisma } from "@/db/prisma";

export const retrieveAll = async ({}): Promise<schema.RetrieveAllCb | null> => {
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
    let status: "ongoing" | "terminated" = !agenda.endAt
      ? "ongoing"
      : "terminated";
    return {
      // TODO: union ongoing | terminated agenda does not match with status
      id: agenda.id,
      title: agenda.title,
      content: agenda.content,
      resolution: agenda.subtitle,
      status: status,
      voters: {
        voted: agenda.choices.reduce(
          (acc, choice) => acc + choice.users.length,
          0
        ),
        total: agenda.voters.length,
      },
      voted: null, // TODO: How to know `voted` without `user`?
      choices: agenda.choices.map((choice) => {
        return {
          id: choice.id,
          name: choice.name,
        };
      }),
    };
  });
  return null;
};

export const vote = async ({
  choiceId, // TODO: Is `choiceId` unique among choices?
}: schema.Vote): Promise<schema.VoteCb> => {
  // TODO: check Votable (necessary?)
  const res = prisma.userChoice.create({
    data: {
      userId: 0, // TODO: How to get userId without `user`?
      choiceId: choiceId,
    },
  });
  return {};
};
