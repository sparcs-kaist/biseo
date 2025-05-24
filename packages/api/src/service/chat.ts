import type { Prisma, User } from "@prisma/client";
import type * as schema from "@biseo/interface/chat";
import type { Agenda } from "@biseo/interface/agenda";
import { prisma } from "@biseo/api/db/prisma";

export const createMessage = async (
  { message, type }: schema.Send,
  user: User,
): Promise<schema.Message> => {
  const anonUser: User = {
    id: 0,
    isAdmin: false,
    username: "익명",
    displayName: "익명",
  };
  const sendQuery: Prisma.ChatCreateInput = {
    user: { connect: user },
    type,
    message,
    createdAt: new Date(),
  };

  const { createdAt, ...createdMessage } = await prisma.chat.create({
    data: sendQuery,
    select: {
      id: true,
      user: {
        select: {
          id: true,
          displayName: true,
          username: true,
        },
      },
      type: true,
      message: true,
      createdAt: true,
    },
  });

  if (type === "anonymous") createdMessage.user = anonUser;

  return {
    ...createdMessage,
    createdAt: createdAt.toISOString(),
  };
};

export const modifyMessage = async ({
  id,
  type,
}: schema.Update): Promise<schema.Message> => {
  const updated = await prisma.chat.update({
    where: { id },
    data: { type },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
        },
      },
    },
  });

  return {
    id: updated.id,
    message: updated.message,
    type: updated.type,
    createdAt: updated.createdAt.toISOString(),
    user: {
      id: updated.user.id,
      displayName: updated.user.displayName,
    },
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
  const anonUser: User = {
    id: 0,
    isAdmin: false,
    username: "익명",
    displayName: "익명",
  };
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

  return messages.map(({ createdAt, ...message }) => {
    const displayMessage = message;
    if (message.type === "anonymous") displayMessage.user = anonUser;
    return {
      ...displayMessage,
      createdAt: createdAt.toISOString(),
    };
  });
};

export const retrieveAdminNotice = async ({
  lastChatId,
  limit,
}: schema.Retrieve): Promise<schema.Message[]> => {
  const anonUser: User = {
    id: 0,
    isAdmin: false,
    username: "익명",
    displayName: "익명",
  };
  const messages = await prisma.chat.findMany({
    orderBy: {
      id: "desc",
    },
    where: {
      type: "adminnotice", // ─ always 필터
      ...(lastChatId != null
        ? { id: { lt: lastChatId } } // ─ lastChatId 있을 때만 추가 필터
        : {}),
    },
    take: limit,
    select: {
      id: true,
      user: true,
      type: true,
      message: true,
      createdAt: true,
    },
  });

  // console.log(messages);

  return messages.map(({ createdAt, ...message }) => {
    const displayMessage = message;
    if (message.type === "anonymous") displayMessage.user = anonUser;

    return {
      ...displayMessage,
      createdAt: createdAt.toISOString(),
    };
  });
};
