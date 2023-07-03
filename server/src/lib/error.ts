import { Error as ErrorResponse } from "biseo-interface/helpers";

export class BiseoError extends Error {
  constructor(message: string) {
    super(message);
  }

  serialize() {
    return { ok: false, message: this.message } as const;
  }
}

export const errorHandler = (callback: (e: ErrorResponse) => void) => (err: unknown) => {
  if (err instanceof BiseoError) return callback(err.serialize());
  return callback(new BiseoError("internal server error").serialize());
};
