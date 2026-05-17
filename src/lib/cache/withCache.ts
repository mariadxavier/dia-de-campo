import { getRedisClient } from "@/src/lib/redis/client";

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
      if (redis.status !== "ready") {
        await redis.connect();
      }

      const cached = await redis.get(key);

      if (cached) {
        return JSON.parse(cached) as T;
      }
    } catch (error) {
      console.warn("[cache] Read failed, bypassing cache:", error);
    }
  }

  const value = await fetcher();

  if (redis) {
    try {
      await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
    } catch (error) {
      console.warn("[cache] Write failed:", error);
    }
  }

  return value;
}
