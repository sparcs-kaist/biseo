import { BiseoError } from "@/lib/error";
import { Prisma, PrismaClient } from "@prisma/client";
import * as schema from "biseo-interface/chat";

const prisma = new PrismaClient();

export const send = async ({
  message,
}: schema.Send): Promise<schema.Message> => {
  const sendQuery: Prisma.ChatCreateInput = {
    user: {}, // TODO: retreive current user info from socket
    type: "Message",
    message: message,
    createdAt: new Date(),
  };

  try {
    return await prisma.chat.create({
      data: sendQuery,
      select: {
        id: true,
        user: true,
        type: true,
        message: true,
        createdAt: true,
      },
    });
  } catch (err) {
    // TODO: log
    console.log(err);
    throw new BiseoError("failed to send chat");
  }
};

export const retrieve = async ({
  lastChatId,
  limit,
}: schema.Retrieve): Promise<schema.Message[] | null> => {
  try {
    return await prisma.chat.findMany({
      orderBy: {
        id: "desc",
      },
      where: lastChatId
        ? {
            id: {
              lt: lastChatId,
            },
          }
        : undefined,
      take: limit,
      select: {
        id: true,
        user: true,
        type: true,
        message: true,
        createdAt: true,
      },
    });
  } catch (err) {
    // TODO: log
    console.log(err);
    return null;
  }
};
