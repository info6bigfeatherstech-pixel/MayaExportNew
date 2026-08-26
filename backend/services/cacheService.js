const { getClient } = require("../config/redis");
const logger = require("../utils/logger");

/**
 * Cache TTLs (seconds)
 */
const TTL = {
  CATEGORIES: 5 * 60,   // 5 minutes
  PRODUCTS: 2 * 60,     // 2 minutes
  DASHBOARD: 60,        // 1 minute
  CUSTOMER: 3 * 60,     // 3 minutes
};

/**
 * Read a value from Redis cache.
 * Returns null if Redis is unavailable or key doesn't exist.
 * @param {string} key
 * @returns {Promise<any|null>}
 */
const getCache = async (key) => {
  try {
    const client = getClient();
    if (!client) return null;
    const value = await client.get(key);
    return value ? JSON.parse(value) : null;
  } catch (err) {
    logger.warn(`Cache GET failed for key "${key}": ${err.message}`);
    return null;
  }
};

/**
 * Write a value to Redis cache.
 * Silently fails if Redis is unavailable.
 * @param {string} key
 * @param {any} value
 * @param {number} [ttl] - seconds
 */
const setCache = async (key, value, ttl = 300) => {
  try {
    const client = getClient();
    if (!client) return;
    await client.setex(key, ttl, JSON.stringify(value));
  } catch (err) {
    logger.warn(`Cache SET failed for key "${key}": ${err.message}`);
  }
};

/**
 * Delete one or more cache keys (accepts a string or array of strings).
 * @param {string|string[]} keys
 */
const deleteCache = async (keys) => {
  try {
    const client = getClient();
    if (!client) return;
    const arr = Array.isArray(keys) ? keys : [keys];
    if (arr.length) await client.del(...arr);
  } catch (err) {
    logger.warn(`Cache DEL failed: ${err.message}`);
  }
};

/**
 * Delete all keys matching a pattern (e.g. "products:*").
 * Uses SCAN to avoid blocking Redis.
 * @param {string} pattern
 */
const deleteCachePattern = async (pattern) => {
  try {
    const client = getClient();
    if (!client) return;

    let cursor = "0";
    do {
      const [nextCursor, keys] = await client.scan(
        cursor,
        "MATCH",
        pattern,
        "COUNT",
        100
      );
      cursor = nextCursor;
      if (keys.length) await client.del(...keys);
    } while (cursor !== "0");
  } catch (err) {
    logger.warn(`Cache pattern DEL failed for "${pattern}": ${err.message}`);
  }
};

module.exports = { getCache, setCache, deleteCache, deleteCachePattern, TTL };
