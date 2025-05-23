import { z } from "zod";
import type { Request, Response } from "express";

import { prisma } from "@biseo/api/db/prisma";

import { authenticate } from "./ldap";
import { gauthenticate } from "./google";
import { getToken } from "./token";

// import { Client } from "@sparcssso/client/sparcsssov2-node.ts";

// const client = new Client(clientId, secretKey, isBeta = false);

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

export const gLoginHandler = async (req: Request, res: Response) => {
  const result = req.body;

  const username = await gauthenticate(result.code);
  if (!username) return res.status(401).send("Unauthorized");

  const user =
    (await prisma.user.findUnique({ where: { username } })) ||
    (await prisma.user.create({ data: { username, displayName: username } }));

  return res.json({ token: getToken(user.username) });
};

// export const ssoLoginHandler = async (req: Request, res: Response) => {
//   // const {url, stateBefore} = client.getLoginParams(); // 이거 따로 처리?
//   // res.redirect(url);

//   // const state = res.state;//
//   // if(stateBefore !== state) {
//   //   res.status(409).send("TOKEN MISMATCH: session might be hijacked!")
//   // }

//   // const code = res.code

//   const username="messi";

//   const user =
//     (await prisma.user.findUnique({ where: { username} })) ||
//     (await prisma.user.create({ data: { username, displayName: username } }));

//   return res.json({ token: getToken(user.username) });
// }

// function loginInit(args) {
//   const { url, state } = client.getLoginParams();
//   session.state = state; // state 값을 session에 저장합니다.
//   res.redirect(url); // 사용자를 loginUrl로 redirect 시킵니다.
// }

// function loginCallback(args) {
//   const stateBefore = session.state; // session에서 state 값을 얻어옵니다.
//   const state = args.state; // get param에서 state 값을 얻어옵니다.

//   if (stateBefore !== state) { // 만일 두 state 값이 다르다면
//     //session이 hijacked 되었을 수 있으므로, 처리를 중단해야 합니다.
//     throw new Error('TOKEN MISMATCH: session might be hijacked!');
//   }

//   const code = args.code // get param에서 code 값을 얻어옵니다.
//   client.getUserInfo(code).then((userData) => {
//     // 이제 userData를 사용하여 적절한 처리를 하면 됩니다.
//   }); // dict 형태로 사용자의 데이터를 가져옵니다.
// }
