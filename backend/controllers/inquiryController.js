const Inquiry = require("../models/Inquiry");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess, sendError, paginationMeta } = require("../utils/apiResponse");
const { deleteCache } = require("../services/cacheService");
const { generateId } = require("../utils/generateId");

// ─── GET /api/inquiries ───────────────────────────────────────────────────────
const getAllInquiries = asyncHandler(async (req, res) => {
  const { search, status, customerId, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.status = status;
  if (customerId) query.customerId = customerId;
  if (search) {
    query.$or = [
      { displayId: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { name: { $regex: search, $options: "i" } },
      { product: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [total, inquiries] = await Promise.all([
    Inquiry.countDocuments(query),
    Inquiry.find(query)
      .populate("customerId", "name company email country")
      .populate("productId", "name image category productType")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
  ]);

  sendSuccess(
    res, 200, "Inquiries retrieved",
    inquiries,
    paginationMeta(total, page, limit)
  );
});

// ─── GET /api/inquiries/:id ───────────────────────────────────────────────────
const getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id)
    .populate("customerId", "name company email phone country address")
    .populate("productId", "name image category productType moq");
  if (!inquiry) return sendError(res, 404, "Inquiry not found");
  sendSuccess(res, 200, "Inquiry retrieved", inquiry);
});

// ─── POST /api/inquiries ──────────────────────────────────────────────────────
const createInquiry = asyncHandler(async (req, res) => {
  const { customerId, productId, quantity, message, date, status } = req.body;

  const [customer, product] = await Promise.all([
    Customer.findById(customerId),
    productId ? Product.findById(productId) : Promise.resolve(null),
  ]);
  if (!customer) return sendError(res, 404, "Customer not found");

  const inquiry = await Inquiry.create({
    displayId: generateId("inquiry"),
    customerId,
    productId: product?._id || null,
    name: customer.name,
    company: customer.company,
    country: customer.country,
    product: product?.name || null,
    quantity: quantity ? Number(quantity) : null,
    message,
    status: status || "New",
    date,
  });

  await deleteCache("dashboard:stats");
  sendSuccess(res, 201, "Inquiry created", inquiry);
});

// ─── PUT /api/inquiries/:id ───────────────────────────────────────────────────
const updateInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return sendError(res, 404, "Inquiry not found");

  const { customerId, productId, quantity, message, date, status } = req.body;

  if (customerId && String(customerId) !== String(inquiry.customerId)) {
    const customer = await Customer.findById(customerId);
    if (!customer) return sendError(res, 404, "Customer not found");
    inquiry.customerId = customerId;
    inquiry.name = customer.name;
    inquiry.company = customer.company;
    inquiry.country = customer.country;
  }

  if (productId && String(productId) !== String(inquiry.productId)) {
    const product = await Product.findById(productId);
    if (!product) return sendError(res, 404, "Product not found");
    inquiry.productId = productId;
    inquiry.product = product.name;
  }

  Object.assign(inquiry, {
    ...(quantity !== undefined && { quantity: Number(quantity) }),
    ...(message && { message }),
    ...(date && { date }),
    ...(status && { status }),
  });

  await inquiry.save();
  await deleteCache("dashboard:stats");
  sendSuccess(res, 200, "Inquiry updated", inquiry);
});

// ─── PATCH /api/inquiries/:id/status ─────────────────────────────────────────
const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return sendError(res, 404, "Inquiry not found");

  inquiry.status = req.body.status;
  await inquiry.save();
  await deleteCache("dashboard:stats");
  sendSuccess(res, 200, "Inquiry status updated", { id: inquiry._id, status: inquiry.status });
});

// ─── DELETE /api/inquiries/:id ────────────────────────────────────────────────
const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);
  if (!inquiry) return sendError(res, 404, "Inquiry not found");

  await inquiry.deleteOne();
  await deleteCache("dashboard:stats");
  sendSuccess(res, 200, "Inquiry deleted", { id: req.params.id });
});

module.exports = {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  updateInquiryStatus,
  deleteInquiry,
};
