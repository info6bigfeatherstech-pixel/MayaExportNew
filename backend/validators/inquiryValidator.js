const { body, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

const INQUIRY_STATUSES = ["New", "Contacted", "In Progress", "Converted", "Closed"];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed", errors.array());
  }
  next();
};

const validateInquiry = [
  body("customerId")
    .notEmpty().withMessage("Customer is required")
    .isMongoId().withMessage("customerId must be a valid MongoDB ObjectId"),
  body("productId")
    .optional({ checkFalsy: true })
    .isMongoId().withMessage("productId must be a valid MongoDB ObjectId"),
  body("quantity")
    .optional()
    .isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
  body("message")
    .trim()
    .notEmpty().withMessage("Message is required")
    .isLength({ max: 3000 }).withMessage("Message cannot exceed 3000 characters"),
  body("date")
    .notEmpty().withMessage("Date is required")
    .trim(),
  body("status")
    .optional()
    .isIn(INQUIRY_STATUSES)
    .withMessage(`Status must be one of: ${INQUIRY_STATUSES.join(", ")}`),
  handleValidationErrors,
];

const validateInquiryStatus = [
  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(INQUIRY_STATUSES)
    .withMessage(`Status must be one of: ${INQUIRY_STATUSES.join(", ")}`),
  handleValidationErrors,
];

module.exports = { validateInquiry, validateInquiryStatus };
