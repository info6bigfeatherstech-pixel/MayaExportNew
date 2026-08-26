const { body, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed", errors.array());
  }
  next();
};

const validateCreateProduct = [
  body("name")
    .trim()
    .notEmpty().withMessage("Product name is required")
    .isLength({ max: 200 }).withMessage("Name cannot exceed 200 characters"),
  body("categoryId")
    .optional()
    .trim(),
  body("category")
    .optional()
    .trim(),
  body("productType")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("Product type cannot exceed 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage("Description cannot exceed 2000 characters"),
  body("details")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Details cannot exceed 500 characters"),
  body("moq")
    .optional()
    .trim(),
  body("status")
    .optional()
    .isIn(["Active", "Draft"]).withMessage("Status must be Active or Draft"),
  body("colors")
    .optional()
    .custom((v) => Array.isArray(v) || typeof v === "string").withMessage("Colors must be an array or comma-separated string"),
  body("sizes")
    .optional()
    .custom((v) => Array.isArray(v) || typeof v === "string").withMessage("Sizes must be an array or comma-separated string"),
  handleValidationErrors,
];

const validateUpdateProduct = [
  body("name")
    .optional()
    .trim()
    .isLength({ max: 200 }).withMessage("Name cannot exceed 200 characters"),
  body("categoryId")
    .optional()
    .trim(),
  body("category")
    .optional()
    .trim(),
  body("productType")
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage("Product type cannot exceed 100 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage("Description cannot exceed 2000 characters"),
  body("details")
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage("Details cannot exceed 500 characters"),
  body("moq")
    .optional()
    .trim(),
  body("status")
    .optional()
    .isIn(["Active", "Draft"]).withMessage("Status must be Active or Draft"),
  body("colors")
    .optional()
    .custom((v) => Array.isArray(v) || typeof v === "string").withMessage("Colors must be an array or comma-separated string"),
  body("sizes")
    .optional()
    .custom((v) => Array.isArray(v) || typeof v === "string").withMessage("Sizes must be an array or comma-separated string"),
  handleValidationErrors,
];

module.exports = {
  validateProduct: validateCreateProduct,
  validateCreateProduct,
  validateUpdateProduct,
};
