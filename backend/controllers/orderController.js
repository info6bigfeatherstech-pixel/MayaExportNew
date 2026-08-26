const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess, sendError, paginationMeta } = require("../utils/apiResponse");
const { deleteCache } = require("../services/cacheService");
const { generateId } = require("../utils/generateId");

// ─── GET /api/orders ──────────────────────────────────────────────────────────
const getAllOrders = asyncHandler(async (req, res) => {
  const { search, status, customerId, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.status = status;
  if (customerId) query.customerId = customerId;
  if (search) {
    query.$or = [
      { displayId: { $regex: search, $options: "i" } },
      { customer: { $regex: search, $options: "i" } },
      { products: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [total, orders] = await Promise.all([
    Order.countDocuments(query),
    Order.find(query)
      .populate("customerId", "name company email country")
      .populate("productId", "name image category productType")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
  ]);

  sendSuccess(
    res, 200, "Orders retrieved",
    orders,
    paginationMeta(total, page, limit)
  );
});

// ─── GET /api/orders/:id ──────────────────────────────────────────────────────
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("customerId", "name company email phone country address")
    .populate("productId", "name image category productType moq");
  if (!order) return sendError(res, 404, "Order not found");
  sendSuccess(res, 200, "Order retrieved", order);
});

// ─── POST /api/orders ─────────────────────────────────────────────────────────
const createOrder = asyncHandler(async (req, res) => {
  const { customerId, productId, quantity, value, date, status, shipping } = req.body;

  // Resolve denormalized fields from references
  const [customer, product] = await Promise.all([
    Customer.findById(customerId),
    Product.findById(productId),
  ]);
  if (!customer) return sendError(res, 404, "Customer not found");
  if (!product) return sendError(res, 404, "Product not found");

  const displayId = generateId("order");

  const order = await Order.create({
    displayId,
    customerId,
    productId,
    customer: customer.company,
    country: customer.country,
    products: `${product.name} × ${Number(quantity).toLocaleString()}`,
    quantity: Number(quantity),
    value: Number(value),
    status: status || "Pending",
    date,
    shipping,
  });

  // Update customer aggregates
  await Customer.findByIdAndUpdate(customerId, {
    $inc: { orders: 1, spend: Number(value) },
    status: "Active", // upgrade Prospect → Active on first order
  });

  // Invalidate dashboard cache
  await deleteCache("dashboard:stats");

  sendSuccess(res, 201, "Order created", order);
});

// ─── PUT /api/orders/:id ──────────────────────────────────────────────────────
const updateOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return sendError(res, 404, "Order not found");

  const { customerId, productId, quantity, value, date, status, shipping } = req.body;

  // If customer changed, re-resolve denormalized fields
  if (customerId && String(customerId) !== String(order.customerId)) {
    const customer = await Customer.findById(customerId);
    if (!customer) return sendError(res, 404, "Customer not found");
    order.customerId = customerId;
    order.customer = customer.company;
    order.country = customer.country;
  }

  if (productId && String(productId) !== String(order.productId)) {
    const product = await Product.findById(productId);
    if (!product) return sendError(res, 404, "Product not found");
    order.productId = productId;
  }

  if (productId || quantity) {
    const prod = await Product.findById(order.productId);
    if (prod) {
      order.products = `${prod.name} × ${Number(quantity || order.quantity).toLocaleString()}`;
    }
  }

  Object.assign(order, {
    ...(quantity !== undefined && { quantity: Number(quantity) }),
    ...(value !== undefined && { value: Number(value) }),
    ...(date && { date }),
    ...(status && { status }),
    ...(shipping !== undefined && { shipping }),
  });

  await order.save();
  await deleteCache("dashboard:stats");
  sendSuccess(res, 200, "Order updated", order);
});

// ─── PATCH /api/orders/:id/status ─────────────────────────────────────────────
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return sendError(res, 404, "Order not found");

  order.status = req.body.status;
  await order.save();
  await deleteCache("dashboard:stats");
  sendSuccess(res, 200, "Order status updated", { id: order._id, status: order.status });
});

// ─── DELETE /api/orders/:id ───────────────────────────────────────────────────
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return sendError(res, 404, "Order not found");

  // Subtract from customer aggregates
  await Customer.findByIdAndUpdate(order.customerId, {
    $inc: { orders: -1, spend: -order.value },
  });

  await order.deleteOne();
  await deleteCache("dashboard:stats");
  sendSuccess(res, 200, "Order deleted", { id: req.params.id });
});

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
};
