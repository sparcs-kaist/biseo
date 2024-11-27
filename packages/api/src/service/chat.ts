import type { Prisma, User } from "@prisma/client";
import type * as schema from "@biseo/interface/chat";
import type { Agenda } from "@biseo/interface/agenda";
import { prisma } from "@biseo/api/db/prisma";

export const createMessage = async (
  { message, type }: schema.Send,
  user: User | undefined,
): Promise<schema.Message> => {
  const anonUser: User = {
    id: 0,
    username: "익명",
    displayName: "익명",
    isAdmin: false,
  };
  const displayAccount = type === "anonymous" ? anonUser : user;
  const sendQuery: Prisma.ChatCreateInput = {
    user: { connect: displayAccount },
    type: "message",
    message,
    createdAt: new Date(),
  };

  console.log("query", sendQuery);

  // TODO-feat/anony
  const { createdAt, ...createdMessage } = await prisma.chat.create({
    data: sendQuery,
    select: {
      id: true,
      user: {
        select: {
          id: true,
          displayName: true,
        },
      },
      type: true,
      message: true,
      createdAt: true,
    },
  });

  return {
    ...createdMessage,
    createdAt: createdAt.toISOString(),
  };
};

export const createNotice = async (
  { title, status }: Agenda,
  user: User,
): Promise<schema.Message> => {
  const sendQuery: Prisma.ChatCreateInput = {
    user: { connect: user },
    type: "notice",
    message: `${title} 투표가 ${
      status === "ongoing" ? "시작" : "종료"
    }되었습니다.`,
    createdAt: new Date(),
  };

  const { createdAt, ...message } = await prisma.chat.create({
    data: sendQuery,
    select: {
      id: true,
      user: true,
      type: true,
      message: true,
      createdAt: true,
    },
  });

  return {
    ...message,
    createdAt: createdAt.toISOString(),
  };
};

export const retrieve = async ({
  lastChatId,
  limit,
}: schema.Retrieve): Promise<schema.Message[]> => {
  const messages = await prisma.chat.findMany({
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

  return messages.map(({ createdAt, ...message }) => ({
    ...message,
    createdAt: createdAt.toISOString(),
  }));
};
