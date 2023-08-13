import type { Prisma, User } from "@prisma/client";
import type * as schema from "biseo-interface/chat";

import { prisma } from "@/db/prisma";

export const createMessage = async (
  { message }: schema.Send,
  user: User,
): Promise<schema.Message> => {
  const sendQuery: Prisma.ChatCreateInput = {
    user: { connect: user },
    type: "message",
    message: message,
    createdAt: new Date(),
  };

  return prisma.chat.create({
    data: sendQuery,
    select: {
      id: true,
      user: true,
      type: true,
      message: true,
      createdAt: true,
    },
  });
};

export const retrieve = async ({
  lastChatId,
  limit,
}: schema.Retrieve): Promise<schema.Message[]> => {
  return prisma.chat.findMany({
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
};
