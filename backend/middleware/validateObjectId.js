const mongoose = require("mongoose");
const { sendError } = require("../utils/apiResponse");

/**
 * Validates that a route param is present and is a non-empty string.
 * Supports both MongoDB ObjectIds (24-hex) and custom display IDs (e.g. "GE-001", "CUS-1001", "slug").
 *
 * @param {string} paramName - The route param name (default 'id')
 */
const validateObjectId = (paramName = "id") => (req, res, next) => {
  const val = req.params[paramName];
  if (!val || typeof val !== "string" || val.trim().length === 0) {
    return sendError(
      res,
      400,
      `Parameter ':${paramName}' is required.`
    );
  }
  next();
};

module.exports = validateObjectId;
