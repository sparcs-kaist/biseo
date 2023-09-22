// import { Client } from "ldapts";
import { prisma } from "@/db/prisma";

import crypto from "crypto";

// const client = new Client({
//   url: "ldap://ldap.sparcs.org",
//   timeout: 0,
//   connectTimeout: 2000,
//   strictDN: true,
// });

/**
 * Sanitize a string to be used in LDAP queries
 * Allows only alphabets and converts to lowercase
 * @param str
 */
// const sanitize = (str: string) =>
//   /^[A-Za-z]+$/.test(str) ? str.toLowerCase() : "";

/**
 * Authenticate a user with LDAP
 */
export const authenticate = async (data: {
  username: string;
  password: string;
}): Promise<string | null> => {
  const user = await prisma.user.findUnique({
    where: {
      username: data.username,
      password: crypto.createHash("sha256").update(data.password).digest("hex"),
    },
  });

  return user?.username || null;
};
