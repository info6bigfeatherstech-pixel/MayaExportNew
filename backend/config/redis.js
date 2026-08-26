const Redis = require("ioredis");
const logger = require("../utils/logger");

let client = null;

/**
 * Creates and connects the Redis client.
 * If REDIS_URL is not set or connection fails, the app continues
 * without caching (graceful degradation).
 */
const connectRedis = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    logger.warn(
      "REDIS_URL not set. Caching disabled — app will run without Redis."
    );
    return;
  }

  client = new Redis(redisUrl, {
    retryStrategy: (times) => {
      if (times > 3) {
        logger.warn("⚠️ Redis server not reachable. Running in fallback mode without Redis caching.");
        return null; // Stop retrying
      }
      return 1000;
    },
    maxRetriesPerRequest: 1,
    enableReadyCheck: true,
    lazyConnect: false,
  });

  client.on("connect", () => logger.info("✅ Redis connected"));
  client.on("ready", () => logger.info("Redis client ready"));
  client.on("error", (err) =>
    logger.warn(`Redis notice: ${err.message}`)
  );
  client.on("close", () => logger.warn("Redis connection closed"));
};

/**
 * Returns the Redis client instance (may be null if not connected).
 */
const getClient = () => client;

module.exports = { connectRedis, getClient };
