import fs from 'fs';
import path from 'path';

const logPath = process.env.LOG_PATH || '../../logs';
const logFile = path.join(logPath, 'errors.log');

if (logPath) {
  fs.mkdirSync(logPath, { recursive: true });
}

export const Logger = {
  error: (message: string, error?: any) => {
    if (logPath) {
      fs.appendFileSync(logFile, `[ERROR] ${message} ${error instanceof Error ? error.message : error ?? ''}\n`);
    }
    console.error(`[ERROR] ${message}`, error instanceof Error ? error.message : error ?? '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data ?? '');
  },
  info: (message: string, data?: any) => {
    console.info(`[INFO] ${message}`, data ?? '');
  }
};
