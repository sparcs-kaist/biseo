import type { Prisma, User } from "@prisma/client";
import * as schema from "@biseo/interface/admin/agenda";
import type {
  OngoingAgenda,
  PreparingAgenda,
  TerminatedAgenda,
} from "@biseo/interface/agenda";
import { prisma } from "@/db/prisma";
import { BiseoError } from "@/lib/error";

const selectSomeUserFields = {
  select: {
    id: true,
    username: true,
    displayName: true,
  },
};

const selectOnlyUser = {
  select: {
    user: selectSomeUserFields,
  },
};

const selectAgendaDefaultFields = {
  select: {
    id: true,
    title: true,
    resolution: true,
    content: true,
  },
};

export const createAgenda = async ({
  title,
  resolution,
  content,
  choices,
  voters,
}: schema.AdminAgendaCreate) => {
  const createAgendaQuery: Prisma.AgendaCreateInput = {
    title,
    resolution,
    content,
    choices: {
      create: choices.map(name => ({ name })),
    },
    voters: {
      create: voters.total.map(id => ({ userId: id })),
    },
  };

  const {
    voters: createdVoters,
    choices: createdChoices,
    ...createdAgenda
  } = await prisma.agenda.create({
    data: createAgendaQuery,
    select: {
      ...selectAgendaDefaultFields.select,
      choices: true,
      voters: selectOnlyUser,
    },
  });

  const agendaVotable: PreparingAgenda = {
    ...createdAgenda,
    status: "preparing",
    choices: createdChoices,
    voters: {
      voted: 0,
      total: createdVoters.length,
    },
    user: {
      votable: true,
    },
  };

  const agendaNotVotable: PreparingAgenda = {
    ...agendaVotable,
    user: {
      votable: false,
    },
  };

  const agendaWithVoters: schema.AdminAgenda = {
    ...agendaVotable,
    choices: createdChoices.map(choice => ({
      id: choice.id,
      name: choice.name,
      count: 0,
    })),
    voters: {
      voted: [],
      total: createdVoters.map(voter => voter.user),
    },
  };

  return {
    voters: createdVoters.map(voter => `user/${voter.user.username}`),
    agendaVotable,
    agendaNotVotable,
    agendaWithVoters,
  };
};

export const startAgenda = async (agendaId: number, user: User) => {
  const { voters: updatedVoters, ...updatedAgenda } =
    await prisma.agenda.update({
      data: {
        startAt: new Date(),
      },
      where: {
        id: agendaId,
        startAt: null,
        deletedAt: null,
      },
      select: {
        ...selectAgendaDefaultFields.select,
        choices: {
          include: {
            users: true,
          },
        },
        voters: selectOnlyUser,
      },
    });

  const userVotable = updatedVoters.some(v => v.user.id === user.id);

  const ongoingAgenda: OngoingAgenda = {
    ...updatedAgenda,
    status: "ongoing",
    voters: {
      voted: 0,
      total: updatedVoters.length,
    },
    user: {
      voted: null,
      votable: userVotable,
    },
  };

  return ongoingAgenda;
};

export const terminateAgenda = async (agendaId: number, user: User) => {
  const {
    voters: updatedVoters,
    choices: updatedChoices,
    ...updatedAgenda
  } = await prisma.agenda.update({
    data: {
      endAt: new Date(),
    },
    where: {
      id: agendaId,
      endAt: null,
      deletedAt: null,
      NOT: {
        startAt: null,
      },
    },
    select: {
      ...selectAgendaDefaultFields.select,
      choices: {
        include: {
          users: true,
          _count: {
            select: {
              users: true,
            },
          },
        },
      },
      voters: selectOnlyUser,
    },
  });

  const userVotable = updatedVoters.some(v => v.user.id === user.id);
  const userVoted = userVotable
    ? updatedChoices.find(c => c.users.some(u => u.userId === user.id))?.id ||
      null
    : null;

  const terminatedAgenda: TerminatedAgenda = {
    ...updatedAgenda,
    status: "terminated",
    choices: updatedChoices.map(choice => ({
      id: choice.id,
      name: choice.name,
      // eslint-disable-next-line no-underscore-dangle
      count: choice._count.users,
    })),
    voters: {
      voted: updatedChoices.reduce(
        (acc, choice) => acc + choice.users.length,
        0,
      ),
      total: updatedVoters.length,
    },
    user: {
      voted: userVoted,
      votable: userVotable,
    },
  };

  return terminatedAgenda;
};

export const updateAgenda = async (agendaUpdate: schema.AdminAgendaUpdate) => {
  // Delete prior choices and voters
  const deleteChoicesQuery = prisma.choice.deleteMany({
    where: {
      agendaId: agendaUpdate.id,
      agenda: {
        startAt: null,
        deletedAt: null,
      },
    },
  });

  const deleteUserAgendaVotableQuery = prisma.userAgendaVotable.deleteMany({
    where: {
      agendaId: agendaUpdate.id,
      agenda: {
        startAt: null,
        deletedAt: null,
      },
    },
  });

  // Update agenda info, choice DB and voter DB
  const updateAgendaQuery = prisma.agenda.update({
    where: {
      id: agendaUpdate.id,
    },
    data: {
      title: agendaUpdate.title,
      resolution: agendaUpdate.resolution,
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
    select: {
      ...selectAgendaDefaultFields.select,
      choices: true,
      voters: selectOnlyUser,
    },
  });

  const result = await prisma.$transaction([
    deleteChoicesQuery,
    deleteUserAgendaVotableQuery,
    updateAgendaQuery,
  ]);

  const { choices, voters, ...updatedAgenda } = result[2];

  const agendaVotable: PreparingAgenda = {
    ...updatedAgenda,
    status: "preparing",
    choices: choices.map(choice => ({
      id: choice.id,
      name: choice.name,
    })),
    voters: {
      voted: 0,
      total: voters.length,
    },
    user: {
      votable: true,
    },
  };

  const agendaNotVotable: PreparingAgenda = {
    ...agendaVotable,
    user: {
      votable: false,
    },
  };

  const agendaWithVoters: schema.AdminAgenda = {
    ...updatedAgenda,
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
  return {
    voters: voters.map(voter => `user/${voter.user.username}`),
    agendaVotable,
    agendaNotVotable,
    agendaWithVoters,
  };
};

export const deleteAgenda = async ({
  id,
}: schema.Delete): Promise<schema.Deleted> => {
  const agenda = await prisma.agenda.findUnique({
    where: {
      id,
    },
    select: {
      startAt: true,
      endAt: true,
      deletedAt: true,
    },
  });
  // Only delete agenda if it is not soft deleted yet, not started yet, or already terminated only.
  if (agenda && !agenda?.deletedAt && (!agenda?.startAt || agenda?.endAt)) {
    await prisma.agenda.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  return { id };
};

export const retrieveAll = async (): Promise<schema.AdminAgenda[]> => {
  const agendaFromDB = await prisma.agenda.findMany({
    where: { deletedAt: null },
    select: {
      ...selectAgendaDefaultFields.select,
      startAt: true,
      endAt: true,
      deletedAt: true,
      choices: {
        include: {
          users: selectOnlyUser,
        },
      },
      voters: selectOnlyUser,
    },
  });

  const res = agendaFromDB.map(agenda => {
    let status: schema.AdminAgendaStatus = "ongoing";
    if (agenda.startAt && !agenda.endAt) status = "ongoing";
    else if (!agenda.startAt && !agenda.endAt) status = "preparing";
    else if (agenda.endAt) status = "terminated";

    const voted = agenda.choices.flatMap(choice =>
      choice.users.map(userChoice => userChoice.user),
    );

    return {
      id: agenda.id,
      title: agenda.title,
      content: agenda.content,
      resolution: agenda.resolution,
      status,
      choices: agenda.choices.map(choice => ({
        id: choice.id,
        name: choice.name,
        count: choice.users.length,
      })),
      voters: {
        total: agenda.voters.map(user => user.user),
        voted,
      },
    };
  });

  return res;
};

export const remind = async ({
  id,
}: schema.Remind): Promise<{
  unvotedUsers: string[];
  agendaId: number;
  message: string;
}> => {
  // Validate if id is existing
  const agenda = await prisma.agenda.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
    },
  });
  if (!agenda) throw new BiseoError(`아젠다(id: ${id})가 존재하지 않습니다.`);

  const unvotedUsers = await prisma.user.findMany({
    select: { username: true },
    where: {
      agendas: { some: { agendaId: id } },
      NOT: { choices: { some: { choice: { agendaId: id } } } },
    },
  });

  const message = "관리자가 투표를 독촉합니다";

  return {
    unvotedUsers: unvotedUsers.map(user => `user/${user.username}`),
    agendaId: id,
    message,
  };
};
