import { Prisma, PrismaClient } from "@prisma/client";
import * as schema from "@/interface/chat";
import { resolve } from "path";
import { userInfo } from "os";
import { BiseoError } from "@/utils";
import { prependListener } from "process";

const prisma = new PrismaClient();

export const send = async ({
  message,
}: schema.Send): Promise<schema.Message | null> => {
  const sendQuery: Prisma.ChatCreateInput = {
    user: {}, // TODO: retreive current user info from socket
    type: "Message",
    message: message,
    createdAt: new Date(),
  };

  try {
    const { ...chatProps } = await prisma.chat.create({
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
      ...chatProps,
    };
  } catch (err) {
    // TODO: log
    console.log(err);
    return null;
  }
};
