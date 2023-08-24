import type { Prisma, User } from "@prisma/client";
import type * as schema from "biseo-interface/chat";
import { Agenda } from "biseo-interface/agenda";

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

export const createNotice = async (
  { title, status }: Agenda,
  user: User,
): Promise<schema.Message> => {
  const sendQuery: Prisma.ChatCreateInput = {
    user: { connect: user },
    type: "notice",
    message: `${title} 투표가 ${
      status === "ongoing" ? "시작" : status === "terminated" ? "종료" : ""
    }되었습니다.`,
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
