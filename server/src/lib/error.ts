import type { Error as ErrorResponse } from "@biseo/interface/helpers";
import logger from "@/utils/logger";

export class BiseoError extends Error {
  serialize() {
    return { ok: false, message: this.message } as const;
  }
}

export const errorHandler =
  (callback: (e: ErrorResponse) => void) => (err: unknown) => {
    if (err instanceof BiseoError) {
      logger.info(err.message);
      return callback(err.serialize());
    }
    logger.error(err);
    return callback(new BiseoError("internal server error").serialize());
  };
