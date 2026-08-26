const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

const { validateOrder, validateOrderStatus } = require("../validators/orderValidator");
const validateObjectId = require("../middleware/validateObjectId");

/**
 * @route   GET  /api/orders
 * @desc    Get all orders
 * @query   search, status, customerId, page, limit
 */
router.get("/", getAllOrders);

/**
 * @route   GET  /api/orders/:id
 * @desc    Get a single order with populated customer & product
 */
router.get("/:id", validateObjectId("id"), getOrderById);

/**
 * @route   POST /api/orders
 * @desc    Create an order
 * @body    customerId, productId, quantity, value, date, status?, shipping?
 */
router.post("/", validateOrder, createOrder);

/**
 * @route   PUT  /api/orders/:id
 * @desc    Update an order (full update)
 */
router.put("/:id", validateObjectId("id"), validateOrder, updateOrder);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status only (used by the inline select in Admin Panel)
 * @body    { status: "Shipped" }
 */
router.patch("/:id/status", validateObjectId("id"), validateOrderStatus, updateOrderStatus);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete an order
 */
router.delete("/:id", validateObjectId("id"), deleteOrder);

module.exports = router;
