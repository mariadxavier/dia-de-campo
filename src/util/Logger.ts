export const Logger = {
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error instanceof Error ? error.message : error ?? '');
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${message}`, data ?? '');
  },
  info: (message: string, data?: any) => {
    console.info(`[INFO] ${message}`, data ?? '');
  }
};
