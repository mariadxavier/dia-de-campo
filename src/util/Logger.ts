import fs from "fs";
import path from "path";

const LOG_DIR = path.resolve(
  process.env.LOG_PATH || "./logs",
);

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, {
      recursive: true,
    });
  }
}

function writeLog(
  file: string,
  level: string,
  message: string,
  data?: unknown,
) {
  ensureLogDir();

  const fullPath = path.join(
    LOG_DIR,
    file,
  );

  const timestamp =
    new Date().toISOString();

  const line =
    `[${timestamp}] [${level}] ${message} ${
      data instanceof Error
        ? data.stack
        : data ?? ""
    }\n`;

  fs.appendFileSync(
    fullPath,
    line,
    "utf8",
  );
}

export const Logger = {
  error(message: string, error?: unknown) {
    writeLog(
      "errors.txt",
      "ERROR",
      message,
      error,
    );

    console.error(
      `[ERROR] ${message}`,
      error,
    );
  },

  warn(message: string, data?: unknown) {
    console.warn(
      `[WARN] ${message}`,
      data,
    );
  },

  info(message: string, data?: unknown) {
    console.info(
      `[INFO] ${message}`,
      data,
    );
  },
};