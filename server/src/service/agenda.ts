import type { Prisma } from "@prisma/client";
import * as schema from "biseo-interface/agenda";
import { prisma } from "@/db/prisma";

export const retrieveAll = async ({}): Promise<schema.RetrieveAllCb | null> => {
  return null;
};

export const vote = async ({
  choiceId,
}: schema.Vote): Promise<schema.VoteCb> => {
  return {};
};
