import { Logger } from './Logger';

export class ErrorHandler {
  static handle<T>(error: any, context: string, fallbackValue?: T): T {
    Logger.error(`Error in ${context}:`, error);

    if (fallbackValue !== undefined) {
      return fallbackValue;
    }

    throw error;
  }
}
