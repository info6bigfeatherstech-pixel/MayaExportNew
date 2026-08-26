const mongoose = require("mongoose");
const dns = require("dns");
const logger = require("../utils/logger");

// Set reliable public DNS servers to resolve MongoDB Atlas SRV lookups on Windows / local ISPs
try {
  dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);
} catch (e) {
  // Ignore if custom DNS cannot be set
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "MONGODB_URI is not defined. Please set it in your .env file."
    );
  }

  const conn = await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  });

  logger.info(`✅ MongoDB connected: ${conn.connection.host}`);

  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected. Attempting to reconnect...");
  });

  mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB reconnected.");
  });

  mongoose.connection.on("error", (err) => {
    logger.error(`MongoDB connection error: ${err.message}`);
  });

  return conn;
};

module.exports = connectDB;
