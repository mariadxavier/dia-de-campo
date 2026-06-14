import { getRedisClient } from "@/src/lib/redis/client";
import { Logger } from "@/src/utils/logger";
import { ErrorHandler } from "@/src/utils/ErrorHandler";

function getDefaultTtl(): number {
  const ttl = Number(process.env.CACHE_TTL_SECONDS ?? 300);
  return Number.isFinite(ttl) && ttl > 0 ? ttl : 300;
}

export async function getCached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = getDefaultTtl(),
): Promise<T> {
  const redis = getRedisClient();

  if (redis) {
    try {
      if (redis.status === "wait") {
        await redis.connect();
      }

      const cached = await redis.get(key);

      if (cached) {
        Logger.info(`[cache] HIT: ${key}`);
        return JSON.parse(cached) as T;
      }
      
      Logger.info(`[cache] MISS: ${key} - Fetching new data`);
    } catch (error) {
      Logger.warn(`[cache] Read failed, bypassing cache for key ${key}:`, error);
    }
  }

  let value: T;
  try {
    value = await fetcher();
  } catch (error) {
    return ErrorHandler.handle(error, `getCached fetcher for key ${key}`) as T;
  }

  if (redis && value !== undefined && value !== null) {
    try {
      await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
      Logger.info(`[cache] POPULATED: ${key}`);
    } catch (error) {
      Logger.warn(`[cache] Write failed for key ${key}:`, error);
    }
  }

  return value;
}
