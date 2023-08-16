import type { User } from "@prisma/client";
import * as schema from "biseo-interface/agenda";
import { prisma } from "@/db/prisma";
import { BiseoError } from "@/lib/error";
import { BiseoServer } from "@/types/socket";

export const retrieveAll = async (
  {}: schema.RetrieveAll,
  user: User,
): Promise<schema.RetrieveAllCb> => {
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
    const userVotable = agenda.voters.some(v => v.userId == user.id);
    //TODO: possible optimization
    const userVoted = userVotable
      ? agenda.choices.find(c => c.users.some(u => u.userId == user.id))?.id ||
        null
      : null;
    const commonField = {
      id: agenda.id,
      title: agenda.title,
      content: agenda.content,
      resolution: agenda.subtitle,
      voters: {
        voted: agenda.choices.reduce(
          (acc, choice) => acc + choice.users.length,
          0,
        ),
        total: agenda.voters.length,
      },
    };
    return !agenda.startAt
      ? {
          ...commonField,
          status: "preparing",
          user: {
            votable: userVotable,
          },
        }
      : !agenda.endAt
      ? {
          ...commonField,
          status: "ongoing",
          user: {
            votable: userVotable,
            voted: userVoted,
          },
          choices: agenda.choices.map(choice => ({
            id: choice.id,
            name: choice.name,
          })),
        }
      : {
          ...commonField,
          status: "terminated",
          user: {
            votable: userVotable,
            voted: userVoted,
          },
          choices: agenda.choices.map(choice => {
            return {
              id: choice.id,
              name: choice.name,
              count: choice.users.length,
            };
          }),
        };
  });
  if (!res) throw new BiseoError("failed to retrieve agenda");

  return res;
};

export const vote = async (
  { choiceId, agendaId }: schema.Vote,
  io: BiseoServer,
  user: User,
) => {
  // validation
  const isUserVotable = !!(await prisma.userAgendaVotable.count({
    where: {
      userId: user.id,
      agendaId: agendaId,
    },
  }));
  if (!isUserVotable) throw new BiseoError("No permission");
  const isAlreadyVoted = !!(await prisma.userChoice.count({
    where: {
      userId: user.id,
      choiceId: choiceId,
    },
  }));
  if (isAlreadyVoted) throw new BiseoError("Already voted");
  const isChoiceInAgenda = !!(await prisma.choice.count({
    where: {
      id: choiceId,
      agendaId: agendaId,
    },
  }));
  if (!isChoiceInAgenda) throw new BiseoError("Invalid choice");
  const res = await prisma.userChoice.create({
    data: {
      userId: user.id,
      choiceId: choiceId,
    },
  });
  io.emit("agenda.voted", {
    id: agendaId,
    voted: choiceId,
  });
  io.emit("admin.agenda.voted", {
    id: agendaId,
    voted: choiceId,
    user: user,
  });
};
