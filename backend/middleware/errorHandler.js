const logger = require("../utils/logger");

/**
 * 404 — route not found
 */
const notFound = (req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.statusCode = 404;
  next(err);
};

/**
 * Centralized error handler.
 * Must be registered LAST in the Express middleware chain.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Internal Server Error";
  let errors = null;

  // ── Mongoose validation error ──────────────────────────────────────────────
  if (err.name === "ValidationError") {
    statusCode = 422;
    message = "Validation failed";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // ── Mongoose duplicate key ─────────────────────────────────────────────────
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue || {})[0] || "field";
    message = `Duplicate value: '${err.keyValue?.[field]}' already exists for ${field}.`;
  }

  // ── Mongoose cast error (invalid ObjectId) ────────────────────────────────
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field '${err.path}': ${err.value}`;
  }

  // ── Express-validator errors forwarded as an array ────────────────────────
  if (Array.isArray(err.errors)) {
    statusCode = 422;
    message = "Validation failed";
    errors = err.errors;
  }

  // ── CORS error ────────────────────────────────────────────────────────────
  if (err.message && err.message.startsWith("CORS policy")) {
    statusCode = 403;
    message = err.message;
  }

  // Log server errors
  if (statusCode >= 500) {
    logger.error(`[${statusCode}] ${message}`, {
      url: req.originalUrl,
      method: req.method,
      stack: err.stack,
    });
  }

  const body = { success: false, message };
  if (errors) body.errors = errors;
  if (process.env.NODE_ENV === "development" && statusCode >= 500) {
    body.stack = err.stack;
  }

  res.status(statusCode).json(body);
};

module.exports = { notFound, errorHandler };
