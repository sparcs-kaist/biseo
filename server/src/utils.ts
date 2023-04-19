import type {
  Emitable,
  Response,
  Error,
} from "biseo-interface/helpers";

export const BiseoResponse = <T extends Emitable>(data: T): Response<T> => ({
  ok: true,
  data,
});

export const BiseoError = (message: string): Error => ({
  ok: false,
  message,
});
