import { Prisma, PrismaClient } from "@prisma/client";
import * as schema from "@/interface/admin/agenda";
import { Deleted } from "@/interface/admin/agenda";

const prisma = new PrismaClient();

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
      create: choices.map((name) => ({ name: name })),
    },
    voters: {
      create: voters.total.map((id) => ({ userId: id })),
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
                  nickname: true,
                  name: true,
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
      })),
      voters: {
        voted: [],
        total: voters.map((voter) => voter.user),
      },
    };
  } catch (err) {
    // TODO: log
    console.log(err);
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

      return updatedAgendaId;
    } catch (err) {
      // TODO: log
      console.log(err);
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

      return updatedAgendaId;
    } catch (err) {
      // TODO: log
      console.log(err);
      return null;
    }
  }

  return null;
};

export const agendaDelete = async ({
  id,
}: schema.Delete): Promise<Deleted | null> => {
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
    console.log(err);
  }
  return null;
};
