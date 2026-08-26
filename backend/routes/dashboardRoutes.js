const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get all dashboard statistics
 * @access  Admin (add auth middleware here when ready)
 */
router.get("/stats", getDashboardStats);

module.exports = router;
