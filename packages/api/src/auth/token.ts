import jwt from "jsonwebtoken";
import { z } from "zod";
import type { User } from "@prisma/client";

import { prisma } from "@biseo/api/db/prisma";
import { env } from "@biseo/api/env";

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week
export const getToken = (username: string) =>
  jwt.sign(
    {
      username,
      iat: Math.floor(Date.now() / 1000),
    },
    env.SECRET_KEY,
  );

const decoded = z.object({
  username: z.string(),
  iat: z.number(),
});

export const getUserFromToken = async (token: string): Promise<User | null> => {
  try {
    const { username, iat } = decoded.parse(jwt.verify(token, env.SECRET_KEY));
    if (iat < Math.floor(Date.now() / 1000) - MAX_AGE) return null;
    return await prisma.user.findUnique({ where: { username } });
  } catch {
    return null;
  }
};
