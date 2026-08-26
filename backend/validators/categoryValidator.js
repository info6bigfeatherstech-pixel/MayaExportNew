const { body, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

/**
 * Middleware factory — runs after validation rules and returns 422 if there are errors.
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed", errors.array());
  }
  next();
};

// ─── Category validators ──────────────────────────────────────────────────────
const validateCategory = [
  body("name")
    .trim()
    .notEmpty().withMessage("Category name is required")
    .isLength({ max: 100 }).withMessage("Name cannot exceed 100 characters"),
  body("slug")
    .optional()
    .trim()
    .toLowerCase()
    .matches(/^[a-z0-9-]+$/).withMessage("Slug may only contain lowercase letters, numbers, and hyphens"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Description cannot exceed 500 characters"),
  body("status")
    .optional()
    .isIn(["Active", "Draft"]).withMessage("Status must be Active or Draft"),
  body("subcategories")
    .optional()
    .custom((value) => {
      if (typeof value === "string") return true; // comma-separated from form
      if (Array.isArray(value)) return true;
      throw new Error("Subcategories must be a string or array");
    }),
  handleValidationErrors,
];

module.exports = { validateCategory };
