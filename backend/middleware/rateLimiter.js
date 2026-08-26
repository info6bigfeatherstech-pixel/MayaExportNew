const rateLimit = require("express-rate-limit");
const { sendError } = require("../utils/apiResponse");

/**
 * Global rate limiter for all /api/* routes.
 * Values are read from environment variables so they can be tuned per environment.
 */
const rateLimiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 min
  max: Number(process.env.RATE_LIMIT_MAX) || 200,
  standardHeaders: true,  // Return RateLimit-* headers
  legacyHeaders: false,
  message: (req, res) => {
    sendError(
      res,
      429,
      "Too many requests from this IP. Please slow down and try again later."
    );
  },
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === "/api/health";
  },
});

/**
 * Stricter limiter for the public contact form (anti-spam).
 */
const contactRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: (_req, res) => {
    sendError(
      res,
      429,
      "You have submitted too many enquiries. Please wait an hour before trying again."
    );
  },
});

module.exports = rateLimiter;
module.exports.contactRateLimiter = contactRateLimiter;
