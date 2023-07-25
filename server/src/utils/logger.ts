import { createLogger, format, transports } from "winston";
import dailyRotateFileTransport from "winston-daily-rotate-file";
import path from "path";

import { env } from "../env";

// logger에서 사용할 포맷들을 정의합니다.
const baseFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss(UTCZ)" }),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);
const finalFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${message} ${
    level === "error" && stack !== undefined ? stack : ""
  }`;
});

// 콘솔 출력 시 사용될 포맷. 색상이 표시됩니다.
const consoleFormat = format.combine(
  baseFormat,
  format.colorize({ all: true }),
  finalFormat,
);

// 파일 출력 시 사용될 포맷. 색 관련 특수문자가 파일에 쓰여지는 것을 방지하기 위해 색상이 표시되지 않습니다.
const fileFormat = format.combine(baseFormat, format.uncolorize(), finalFormat);
const datePattern = "YYYY-MM-DD-HH"; // 로그 파일명에 포함되는 시각
const maxSize = 5242880; // 로그 파일당 최대 크기 (=5MB)

/**
 * console.log()와 console.error() 대신 사용되는 winston Logger 객체입니다.
 *
 * 전체 로그는 "logs/YYYY-MM-DD-HH.combined.log" 파일에,
 * 예외 처리로 핸들링 된 오류 로그는 "logs/YYYY-MM-DD-HH.error.log" 파일에,
 * 예외 처리가 되지 않은 오류는 "logs/YYYY-MM-DD-HH.unhandled.log"에 저장됩니다.
 * @method info(message: string, callback: winston.LogCallback) - 일반적인 정보(API 접근 등) 기록을 위해 사용합니다.
 * @method error(message: string, callback: winston.LogCallback)  - 오류 메시지를 기록하기 위해 사용합니다.
 */
const logger = createLogger({
  level: "info", // "info"와 같은 중요도이거나 더 중요한 레벨의 로그들만 로깅합니다("info", "warn", "error").
  format: fileFormat,
  defaultMeta: { service: "biseo" },
  transports: [
    new dailyRotateFileTransport({
      level: "info", // "info", "warn", "error" 로그를 저장합니다.
      filename: path.resolve("../logs/%DATE%-combined.log"),
      datePattern,
      maxSize,
    }),
    new dailyRotateFileTransport({
      level: "error", // "error" 로그를 저장합니다.
      filename: path.resolve("../logs/%DATE%-error.log"),
      datePattern,
      maxSize,
    }),
    new transports.Console({
      // production, test 환경에는 화려한 콘솔이 없을 가능성이 높으므로 색상 없이 출력합니다.
      format: env.NODE_ENV === "development" ? consoleFormat : fileFormat,
    }),
  ],
  exceptionHandlers: [
    // 핸들링되지 않은 예외들은 별도의 파일로 저장됩니다. 콘솔로도 출력됩니다.
    new dailyRotateFileTransport({
      filename: path.resolve("../logs/%DATE%-unhandled.log"),
      datePattern,
      maxSize,
    }),
    new transports.Console(),
  ],
});

export { logger };
