import type { User } from "@prisma/client";
import * as schema from "biseo-interface/agenda";
import { prisma } from "@/db/prisma";

export const retrieveAll = async (
  {}: schema.RetrieveAll,
  user: User
): Promise<schema.RetrieveAllCb | null> => {
  const agendaDbRes = await prisma.agenda.findMany({
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
  const res = agendaDbRes.map((agenda): schema.Agenda => {
    const userVotable = agenda.voters.some((v) => v.userId == user.id);
    //TODO: possible optimization
    const userVoted = userVotable
      ? agenda.choices.find((c) => c.users.some((u) => u.userId == user.id))
          ?.id || null
      : null;
    const commonField = {
      id: agenda.id,
      title: agenda.title,
      content: agenda.content,
      resolution: agenda.subtitle,
      voters: {
        voted: agenda.choices.reduce(
          (acc, choice) => acc + choice.users.length,
          0
        ),
        total: agenda.voters.length,
      },
    };
    return !agenda.startAt
      ? {
          ...commonField,
          status: "preparing",
        }
      : !agenda.endAt
      ? {
          ...commonField,
          status: "ongoing",
          user: {
            votable: userVotable,
            voted: userVoted,
          },
          choices: agenda.choices.map((choice) => {
            return {
              id: choice.id,
              name: choice.name,
            };
          }),
        }
      : {
          ...commonField,
          status: "terminated",
          choices: agenda.choices.map((choice) => {
            return {
              id: choice.id,
              name: choice.name,
              count: choice.users.length,
            };
          }),
        };
  });
  return res;
};

export const vote = async (
  { choiceId }: schema.Vote,
  user: User
): Promise<schema.VoteCb> => {
  const res = prisma.userChoice.create({
    data: {
      userId: user.id,
      choiceId: choiceId,
    },
  });
  return {};
};
