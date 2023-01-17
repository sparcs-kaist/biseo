import { atom } from "recoil";
import type { ClientSocket } from "@/types";

export const tokenState = atom<string | null>({
  key: "token",
  default: null,
});

export const socketState = atom<ClientSocket | null>({
  key: "socket",
  default: null,
});

