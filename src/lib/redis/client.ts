import Redis from "ioredis";

let redisClient: Redis | null = null;
let redisUnavailable = false;

export function getRedisClient(): Redis | null {
  if (redisUnavailable) {
    return null;
  }

  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    redisUnavailable = true;
    console.warn("[redis] REDIS_URL is not set. Cache is disabled.");
    return null;
  }

  redisClient = new Redis(redisUrl, {
    maxRetriesPerRequest: 1,
    lazyConnect: true,
  });

  redisClient.on("error", (error) => {
    console.warn("[redis] Connection error:", error.message);
  });

  return redisClient;
}

export async function pingRedis(): Promise<boolean> {
  const client = getRedisClient();

  if (!client) {
    return false;
  }

  try {
    if (client.status !== "ready") {
      await client.connect();
    }
    const result = await client.ping();
    return result === "PONG";
  } catch {
    return false;
  }
}
