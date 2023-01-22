import { atom } from "recoil";
import type { BiseoSocket } from "@/types";

export const tokenState = atom<string | null>({
  key: "token",
  default: null,
});

export const socketState = atom<BiseoSocket | null>({
  key: "socket",
  default: null,
});

