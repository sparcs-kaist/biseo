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

// 파일 출력 시 사용될 포맷. 색 관련 특수문자가 파일에 쓰여지는 것을 방지하기 위해 색상이 표시되지 않습니다.
const uncolorizedFormat = format.combine(
  baseFormat,
  format.uncolorize(),
  finalFormat,
);

// 콘솔 출력 시 사용될 포맷. 색상이 표시됩니다.
const colorizedFormat = format.combine(
  baseFormat,
  format.colorize({ all: true }),
  finalFormat,
);

// 로그 파일명에 포함되는 시각 포맷을 정의합니다.
const datePattern = "YYYY-MM-DD-HH";
// 로그 파일당 최대 크기를 정의합니다(=5MB).
const maxSize = 5242880;

const logger =
  env.NODE_ENV === "production"
    ? // "production" 환경에서 사용되는 winston Logger 객체를 생성합니다.
      createLogger({
        level: "info",
        format: uncolorizedFormat,
        defaultMeta: { service: "biseo" },
        transports: [
          // 전체 로그("info", "warn", "error")를 저장합니다.
          new dailyRotateFileTransport({
            level: "info",
            filename: path.resolve("logs/%DATE%-combined.log"),
            datePattern,
            maxSize,
          }),
          // 예외 처리로 핸들링 된 오류 로그("error")를 저장합니다.
          new dailyRotateFileTransport({
            level: "error",
            filename: path.resolve("logs/%DATE%-error.log"),
            datePattern,
            maxSize,
          }),
        ],
        exceptionHandlers: [
          // 예외 처리가 되지 않은 오류 로그("error")를 저장합니다.
          new dailyRotateFileTransport({
            filename: path.resolve("logs/%DATE%-unhandled.log"),
            datePattern,
            maxSize,
          }),
        ],
      })
    : // "development", "test" 환경에서 사용되는 winston Logger 객체입니다.
      createLogger({
        level: "info",
        format: colorizedFormat,
        defaultMeta: { service: "biseo" },
        transports: [new transports.Console()],
        exceptionHandlers: [new transports.Console()],
      });

/**
 * console.log()와 console.error() 대신 사용되는 winston Logger 객체입니다.
 * production 환경에서는 파일 시스템에 로그가 저장되고, development와 test 환경에서는 콘솔에 로그가 출력됩니다.
 *
 * @method info(message: string, callback: winston.LogCallback) - 일반적인 정보(API 접근 등) 기록을 위해 사용합니다.
 * @method error(message: string, callback: winston.LogCallback)  - 오류 메시지를 기록하기 위해 사용합니다.
 */
export { logger };
