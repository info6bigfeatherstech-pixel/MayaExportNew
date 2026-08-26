const { body, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed", errors.array());
  }
  next();
};

const INTERESTS = [
  "Garments",
  "Footwear",
  "Fabrics",
  "Home Textile",
  "Electronics & Appliances",
  "Others",
];

/**
 * Validates the public contact form from Contact.jsx
 * Fields: fullName, company, email, phone, country, interest, subject, message
 */
const validateContact = [
  body("fullName")
    .trim()
    .notEmpty().withMessage("Full name is required")
    .isLength({ max: 150 }).withMessage("Name cannot exceed 150 characters"),
  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage("Company cannot exceed 200 characters"),
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
  body("interest")
    .optional({ checkFalsy: true })
    .isIn([...INTERESTS, ""])
    .withMessage(`Interest must be one of: ${INTERESTS.join(", ")}`),
  body("subject")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 300 }).withMessage("Subject cannot exceed 300 characters"),
  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ max: 3000 }).withMessage("Message cannot exceed 3000 characters"),
  handleValidationErrors,
];

module.exports = { validateContact };
