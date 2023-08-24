import * as schema from "biseo-interface/admin/user";
import { prisma } from "@/db/prisma";

export const retrieveAll = async (): Promise<schema.AdminUser[]> => {
  const findUsers = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      displayName: true,
      isAdmin: true,
      tags: {
        select: {
          tag: true,
        },
      },
    },
  });

  return findUsers.map(user => ({
    ...user,
    tags: user.tags.map(tag => tag.tag.title),
  }));
};
