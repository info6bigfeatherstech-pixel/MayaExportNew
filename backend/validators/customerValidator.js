const { body, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed", errors.array());
  }
  next();
};

const validateCustomer = [
  body("name")
    .trim()
    .notEmpty().withMessage("Contact name is required")
    .isLength({ max: 150 }).withMessage("Name cannot exceed 150 characters"),
  body("company")
    .trim()
    .notEmpty().withMessage("Company name is required")
    .isLength({ max: 200 }).withMessage("Company name cannot exceed 200 characters"),
  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please provide a valid email address")
    .normalizeEmail(),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 30 }).withMessage("Phone cannot exceed 30 characters"),
  body("country")
    .trim()
    .notEmpty().withMessage("Country is required")
    .isLength({ max: 100 }).withMessage("Country cannot exceed 100 characters"),
  body("address")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 500 }).withMessage("Address cannot exceed 500 characters"),
  body("notes")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 }).withMessage("Notes cannot exceed 2000 characters"),
  body("status")
    .optional()
    .isIn(["Active", "Prospect"]).withMessage("Status must be Active or Prospect"),
  handleValidationErrors,
];

module.exports = { validateCustomer };
