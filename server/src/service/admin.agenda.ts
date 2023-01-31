import { Prisma, PrismaClient } from "@prisma/client";
import * as schema from "@/interface/admin/agenda";

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
        include: {
          choices: true,
          voters: true,
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
        total: voters.map(voter => ({
          id: voter.userId,
          name: "",      // TODO
          nickname: "",  // TODO
        })),
      },
    };

  } catch (err) {
    // TODO: log
    console.log(err);
    return null;
  }
};
