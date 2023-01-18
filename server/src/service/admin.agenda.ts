import { Request, Response } from "../../../socket/io";
import { type Create } from "../../../socket/admin.agenda";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const agendaCreate = async ({
  title,
  subtitle,
  content,
  choices,
  voters,
}: Request<Create>): Promise<Response<Create> | null> => {
  const createAgendaQuery: Prisma.AgendaCreateInput = {
    title: title,
    subtitle: subtitle,
    content: content,
    choices: {
      create: choices.map((name) => ({ name: name })),
    },
    voters: {
      create: voters.map((id) => ({ userId: id })),
    },
  };

  try {
    const { id, title, subtitle, content, choices, voters } =
      await prisma.agenda.create({
        data: createAgendaQuery,
        include: {
          choices: true,
          voters: true,
        },
      });

    const result: Response<Create> = {
      id,
      title,
      subtitle,
      content,
      status: "prepare",
      choices: choices.map((choice) => ({
        id: choice.id,
        name: choice.name,
        voters: [],
      })),
      voters: voters.map((voter) => voter.userId),
    };

    return result;
  } catch (err) {
    // TODO: log
    console.log(err);
    return null;
  }
};
