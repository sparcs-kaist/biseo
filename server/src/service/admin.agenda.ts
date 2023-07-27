import type { Prisma } from "@prisma/client";
import * as schema from "biseo-interface/admin/agenda";
import { prisma } from "@/db/prisma";
import { AgendaStatus } from "biseo-interface/agenda";

import { logger } from "@/utils/logger";

export const agendaCreate = async ({
  title,
  resolution,
  content,
  choices,
  voters,
}: schema.AdminAgendaCreate): Promise<schema.AdminAgenda | null> => {
  const createAgendaQuery: Prisma.AgendaCreateInput = {
    title: title,
    subtitle: resolution,
    content: content,
    choices: {
      create: choices.map(name => ({ name: name })),
    },
    voters: {
      create: voters.total.map(id => ({ userId: id })),
    },
  };

  try {
    const { subtitle, choices, voters, ...agendaProps } =
      await prisma.agenda.create({
        data: createAgendaQuery,
        select: {
          id: true,
          title: true,
          subtitle: true,
          content: true,
          choices: true,
          voters: {
            include: {
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
      });

    return {
      ...agendaProps,
      resolution: subtitle,
      status: "preparing",
      choices: choices.map(choice => ({
        id: choice.id,
        name: choice.name,
        count: 0,
      })),
      voters: {
        voted: [],
        total: voters.map(voter => voter.user),
      },
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const agendaStatusUpdate = async ({
  id,
  status,
}: schema.StatusUpdate): Promise<schema.StatusUpdated | null> => {
  if (status == "ongoing") {
    const updateAgendaQuery: Prisma.AgendaUpdateInput = {
      startAt: new Date(),
    };

    try {
      const updatedAgendaId = await prisma.agenda.update({
        data: updateAgendaQuery,
        where: {
          id: id,
          startAt: null,
          deletedAt: null,
        },
        select: {
          id: true,
        },
      });

      return { id: updatedAgendaId.id, status: "ongoing" };
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  if (status == "terminated") {
    const updateAgendaQuery: Prisma.AgendaUpdateInput = {
      endAt: new Date(),
    };

    try {
      const updatedAgendaId = await prisma.agenda.update({
        data: updateAgendaQuery,
        where: {
          id: id,
          endAt: null,
          deletedAt: null,
          NOT: {
            startAt: null,
          },
        },
        select: {
          id: true,
        },
      });

      return { id: updatedAgendaId.id, status: "terminated" };
    } catch (err) {
      logger.error(err);
      return null;
    }
  }

  return null;
};

export const agendaDelete = async ({
  id,
}: schema.Delete): Promise<schema.Deleted | null> => {
  try {
    const agenda = await prisma.agenda.findUnique({
      where: {
        id: id,
      },
      select: {
        startAt: true,
        endAt: true,
        deletedAt: true,
      },
    });
    //Only delete agenda if it is not soft deleted yet, not started yet, or already terminated only.
    if (agenda && !agenda?.deletedAt && (!agenda?.startAt || agenda?.endAt)) {
      await prisma.agenda.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    }
  } catch (err) {
    logger.error(err);
  }
  return null;
};

export const agendaUpdate = async (
  agendaUpdate: schema.AdminAgendaUpdate,
): Promise<schema.Updated | null> => {
  try {
    //Delete prior choices and voters
    await prisma.choice.deleteMany({
      where: {
        agendaId: agendaUpdate.id,
      },
    });
    await prisma.userAgendaVotable.deleteMany({
      where: {
        agendaId: agendaUpdate.id,
      },
    });
    //Update agenda info, choice DB and voter DB
    await prisma.agenda.update({
      where: {
        id: agendaUpdate.id,
      },
      data: {
        title: agendaUpdate.title,
        subtitle: agendaUpdate.resolution,
        content: agendaUpdate.content,
        choices: {
          createMany: {
            data: agendaUpdate.choices.map(it => ({ name: it })),
          },
        },
        voters: {
          createMany: {
            data: agendaUpdate.voters.total.map(it => ({
              userId: it,
            })),
          },
        },
      },
    });
    const { subtitle, choices, voters, ...agendaProps } =
      await prisma.agenda.update({
        where: {
          id: agendaUpdate.id,
        },
        data: {
          title: agendaUpdate.title,
          subtitle: agendaUpdate.resolution,
          content: agendaUpdate.content,
          choices: {
            createMany: {
              data: agendaUpdate.choices.map((it) => ({ name: it })),
            },
          },
          voters: {
            createMany: {
              data: agendaUpdate.voters.total.map((it) => ({
                userId: it,
              })),
            },
          },
        },
        select: {
          id: true,
          title: true,
          subtitle: true,
          content: true,
          choices: true,
          voters: {
            include: {
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
      });
    return {
      ...agendaProps,
      resolution: subtitle,
      status: "preparing",
      choices: choices.map((choice) => ({
        id: choice.id,
        name: choice.name,
        voters: [],
        count: 0,
      })),
      voters: {
        voted: [],
        total: voters.map((voter) => voter.user),
      },
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const retrieveAll = async (): Promise<schema.AdminAgenda[] | null> => {
  try {
    const agendaFromDB = await prisma.agenda.findMany({
      where: { deletedAt: null },

      select: {
        id: true,
        title: true,
        subtitle: true,
        content: true,
        startAt: true,
        endAt: true,
        deletedAt: true,

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
    });

    const res = agendaFromDB.map((agenda) => {
      const status: schema.AdminAgendaStatus = !agenda.startAt
        ? "preparing"
        : !agenda.endAt
        ? "ongoing"
        : "terminated";
      let voted: { id: number; username: string; displayName: string }[] = [];
      for (const choice of agenda.choices) {
        for (const voter of choice.users) {
          voted = [...voted, voter.user];
        }
      }
      return {
        id: agenda.id,
        title: agenda.title,
        content: agenda.content,
        resolution: agenda.subtitle,
        status: status,
        choices: agenda.choices.map((choice) => ({
          id: choice.id,
          name: choice.name,
          count: choice.users.length,
        })),
        voters: {
          total: agenda.voters.map(user => user.user),
          voted: voted,
        },
      };
    });
    return res;
  } catch (err) {
    logger.error(err);
    return null;
  }
};

export const remind = async ({
  id,
}: schema.Remind): Promise<{
  usernames: string[];
  agendaId: number;
  message: string;
} | null> => {
  try {
    // Validate if id is existing
    const agenda = await prisma.agenda.findUnique({
      where: {
        id: id,
      },
      select: {
        title: true,
      },
    });
    const unvotedUsers = await prisma.user.findMany({
      select: { username: true },
      where: {
        agendas: { some: { agendaId: id } },
        NOT: { choices: { some: { choice: { agendaId: id } } } },
      },
    });
    const message = "관리자가 투표를 독촉합니다";
    if (!agenda) return null;
    if (!unvotedUsers) return { usernames: [], agendaId: id, message: message };
    // let votedId: number[] = [];
    // const totalId = agenda.voters.map((votableId) => votableId.user);
    // for (const choice of agenda.choices) {
    //   const user: number[] = choice.users.map((user) => user.user.id);
    //   votedId = [...votedId, ...user];
    // }
    // const unvoters = totalId
    //   .filter((user) => !votedId.includes(user.id))
    //   .map((person) => person.username);

    return {
      usernames: unvotedUsers.map((user) => user.username),
      agendaId: id,
      message: message,
    };
  } catch (err) {
    logger.error(err);
    return null;
  }
};
