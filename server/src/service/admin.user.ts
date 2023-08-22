import * as schema from "biseo-interface/admin/user";
import { prisma } from "@/db/prisma";

export const retrieveAll = async (): Promise<schema.AdminUser[]> => {
  return prisma.user.findMany({
    select: {
      id: true,
      username: true,
      displayName: true,
      isAdmin: true,
      tags: true,
    },
  });
};
