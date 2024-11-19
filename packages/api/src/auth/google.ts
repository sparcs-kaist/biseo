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
    const username = Token.parse(
      jwt.decode(token.tokens.id_token!),
    ).email.split("@")[0];
    return username;
  } catch {
    return null;
  }
};
