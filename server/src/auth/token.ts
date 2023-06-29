import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "@/env";

const MAX_AGE = 60 * 60 * 24 * 7; // 1 week
export const getToken = (username: string) => {
  return jwt.sign({
    username,
    iat: Math.floor(Date.now() / 1000),
  }, env.SECRET_KEY);
};

const decoded = z.object({
  username: z.string(),
  iat: z.number(),
});

export const verifyToken = (token: string) => {
  try {
    const { username, iat } = decoded.parse(jwt.verify(token, env.SECRET_KEY));
    if (iat < Math.floor(Date.now() / 1000) - MAX_AGE) return null;
    return username;
  } catch {
    return null;
  }
};
