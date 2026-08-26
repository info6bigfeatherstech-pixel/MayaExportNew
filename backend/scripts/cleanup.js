require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const dns = require("dns");
try { dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]); } catch (_) {}

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");
const { deleteCachePattern } = require("../services/cacheService");

async function clean() {
  await connectDB();
  const del = await Product.deleteMany({ displayId: /^PRD-/ });
  console.log("Removed test products:", del.deletedCount);
  await deleteCachePattern("products:*");
  const remaining = await Product.find({}).sort({ displayId: 1 }).select("displayId name category");
  console.log("Final DB Products count:", remaining.length);
  console.log("All 24 Codes:", remaining.map((p) => `${p.displayId} (${p.name})`));
  process.exit(0);
}

clean();
