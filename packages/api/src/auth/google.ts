import { z } from "zod";
import { OAuth2Client } from "google-auth-library";
import { env } from "@biseo/api/env";
import jwt from "jsonwebtoken";

const Token = z.object({
  email: z.string(),
});

export const gauthenticate = async (code: string): Promise<string | null> => {
  try {
    const logininfo = new OAuth2Client(
      env.GOOGLE_CLIENT,
      env.GOOGLE_SECRET,
      "postmessage",
    );
    const token = await logininfo.getToken(code);
    const mail = Token.parse(jwt.decode(token.tokens.id_token!)).email;
    const username =
      mail.split("@")[1] === "sparcs.org" ? mail.split("@")[0] : null;
    return username;
  } catch {
    return null;
  }
};
