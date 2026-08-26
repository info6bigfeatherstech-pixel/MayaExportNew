const { createLogger, format, transports } = require("winston");
const path = require("path");

const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format for console
const consoleFormat = printf(({ level, message, timestamp: ts, stack }) => {
  return `${ts} [${level}]: ${stack || message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "warn" : "debug",
  format: combine(
    errors({ stack: true }), // capture stack traces
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" })
  ),
  transports: [
    // Console transport — coloured in development
    new transports.Console({
      format: combine(colorize(), consoleFormat),
    }),
    // File transport for errors (production-ready)
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
      format: combine(format.json()),
      maxsize: 5_242_880, // 5 MB
      maxFiles: 5,
    }),
    // Combined log file
    new transports.File({
      filename: path.join("logs", "combined.log"),
      format: combine(format.json()),
      maxsize: 5_242_880,
      maxFiles: 5,
    }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join("logs", "exceptions.log") }),
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join("logs", "rejections.log") }),
  ],
});

module.exports = logger;
