import { z } from "zod";
import type { Request, Response } from "express";

import { prisma } from "@biseo/api/db/prisma";

import { authenticate } from "./ldap";
import { getToken } from "./token";

const Login = z.object({
  username: z.string(),
  password: z.string(),
});

export const loginHandler = async (req: Request, res: Response) => {
  const result = await Login.spa(req.body);

  if (!result.success) return res.status(400).send("Bad request");

  const username = await authenticate(result.data);
  if (!username) return res.status(401).send("Unauthorized");

  const user =
    (await prisma.user.findUnique({ where: { username } })) ||
    (await prisma.user.create({ data: { username, displayName: username } }));

  return res.json({ token: getToken(user.username) });
};

const parseJwt = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

export const gLoginHandler = async (req: Request, res: Response) => {
  const logininfo = parseJwt(req.body.credential);
  const username = logininfo.email.split("@")[0];

  const user =
    (await prisma.user.findUnique({ where: { username } })) ||
    (await prisma.user.create({ data: { username, displayName: username } }));

  return res.json({ token: getToken(user.username) });
};
