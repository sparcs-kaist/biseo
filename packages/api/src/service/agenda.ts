import type { User } from "@prisma/client";
import type * as schema from "@biseo/interface/agenda";
import { prisma } from "@biseo/api/db/prisma";
import { BiseoError } from "@biseo/api/lib/error";
import { type BiseoServer } from "@biseo/api/types/socket";

export const retrieveAll = async (
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
    orderBy: {
      endAt: "desc",
    },
  });
  const res = agendaDbRes.map((agenda): schema.Agenda => {
    const userVotable = agenda.voters.some(v => v.userId === user.id);
    // TODO: possible optimization
    const userVoted = userVotable
      ? agenda.choices.find(c => c.users.some(u => u.userId === user.id))?.id ||
        null
      : null;
    const commonField = {
      id: agenda.id,
      title: agenda.title,
      content: agenda.content,
      resolution: agenda.resolution,
      voters: {
        voted: agenda.choices.reduce(
          (acc, choice) => acc + choice.users.length,
          0,
        ),
        total: agenda.voters.length,
      },
      startAt: agenda.startAt,
    };

    if (!agenda.startAt) {
      return {
        ...commonField,
        status: "preparing",
        user: {
          votable: userVotable,
        },
        choices: agenda.choices.map(choice => ({
          id: choice.id,
          name: choice.name,
        })),
      };
    }
    if (!agenda.endAt) {
      return {
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
      };
    }
    return {
      ...commonField,
      status: "terminated",
      user: {
        votable: userVotable,
        voted: userVoted,
      },
      choices: agenda.choices.map(choice => ({
        id: choice.id,
        name: choice.name,
        count: choice.users.length,
      })),
      startAt: agenda.startAt.toISOString(),
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
      agendaId,
    },
  }));
  if (!isUserVotable) throw new BiseoError("No permission");
  const isAlreadyVoted = !!(await prisma.userChoice.count({
    where: {
      userId: user.id,
      choiceId,
    },
  }));
  if (isAlreadyVoted) throw new BiseoError("Already voted");
  const isChoiceInAgenda = !!(await prisma.choice.count({
    where: {
      id: choiceId,
      agendaId,
    },
  }));
  if (!isChoiceInAgenda) throw new BiseoError("Invalid choice");
  const res = await prisma.userChoice.create({
    data: {
      userId: user.id,
      choiceId,
    },
    select: {
      choice: {
        select: {
          agenda: {
            select: {
              choices: {
                select: {
                  id: true,
                  name: true,
                  users: {
                    select: {
                      user: {
                        select: {
                          id: true,
                          username: true,
                          displayName: true,
                        },
                      },
                    },
                  },
                },
              },
              voters: {
                select: {
                  user: {
                    select: {
                      id: true,
                      username: true,
                      displayName: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  io.to(`user/${user.username}`).emit("agenda.voted", {
    id: agendaId,
    user: {
      voted: choiceId,
    },
    voters: {
      voted: res.choice.agenda.choices.reduce(
        (acc, choice) => acc + choice.users.length,
        0,
      ),
      total: res.choice.agenda.voters.length,
    },
  });
  io.to("admin").emit("admin.agenda.voted", {
    id: agendaId,
    choices: res.choice.agenda.choices.map(choice => ({
      id: choice.id,
      name: choice.name,
      count: choice.users.length,
    })),
    voters: {
      voted: res.choice.agenda.choices.flatMap(c => c.users.map(u => u.user)),
      total: res.choice.agenda.voters.flatMap(v => v.user),
    },
  });
};
