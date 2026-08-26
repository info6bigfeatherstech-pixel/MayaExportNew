const { body, validationResult } = require("express-validator");
const { sendError } = require("../utils/apiResponse");

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return sendError(res, 422, "Validation failed", errors.array());
  }
  next();
};

const validateOrder = [
  body("customerId")
    .notEmpty().withMessage("Customer is required")
    .isMongoId().withMessage("customerId must be a valid MongoDB ObjectId"),
  body("productId")
    .notEmpty().withMessage("Product is required")
    .isMongoId().withMessage("productId must be a valid MongoDB ObjectId"),
  body("quantity")
    .notEmpty().withMessage("Quantity is required")
    .isInt({ min: 1 }).withMessage("Quantity must be a positive integer"),
  body("value")
    .notEmpty().withMessage("Order value is required")
    .isFloat({ min: 0 }).withMessage("Order value must be a non-negative number"),
  body("date")
    .notEmpty().withMessage("Order date is required")
    .trim(),
  body("status")
    .optional()
    .isIn(ORDER_STATUSES)
    .withMessage(`Status must be one of: ${ORDER_STATUSES.join(", ")}`),
  body("shipping")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 1000 }).withMessage("Shipping info cannot exceed 1000 characters"),
  handleValidationErrors,
];

const validateOrderStatus = [
  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(ORDER_STATUSES)
    .withMessage(`Status must be one of: ${ORDER_STATUSES.join(", ")}`),
  handleValidationErrors,
];

module.exports = { validateOrder, validateOrderStatus };
