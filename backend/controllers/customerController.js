const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Inquiry = require("../models/Inquiry");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess, sendError, paginationMeta } = require("../utils/apiResponse");
const { generateId } = require("../utils/generateId");

// ─── GET /api/customers ───────────────────────────────────────────────────────
const getAllCustomers = asyncHandler(async (req, res) => {
  const { search, status, country, page = 1, limit = 20 } = req.query;

  const query = {};
  if (status) query.status = status;
  if (country) query.country = { $regex: country, $options: "i" };
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { displayId: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [total, customers] = await Promise.all([
    Customer.countDocuments(query),
    Customer.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
  ]);

  sendSuccess(
    res, 200, "Customers retrieved",
    customers,
    paginationMeta(total, page, limit)
  );
});

// ─── GET /api/customers/:id ───────────────────────────────────────────────────
// Returns customer + their order history + inquiry history
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return sendError(res, 404, "Customer not found");

  // Fetch related records in parallel
  const [orders, inquiries] = await Promise.all([
    Order.find({ customerId: customer._id })
      .populate("productId", "name image category")
      .sort({ createdAt: -1 }),
    Inquiry.find({ customerId: customer._id })
      .populate("productId", "name image category")
      .sort({ createdAt: -1 }),
  ]);

  sendSuccess(res, 200, "Customer retrieved", {
    customer,
    orders,
    inquiries,
  });
});

// ─── POST /api/customers ──────────────────────────────────────────────────────
const createCustomer = asyncHandler(async (req, res) => {
  const { name, company, email, phone, country, address, notes, status } = req.body;

  const customer = await Customer.create({
    displayId: generateId("customer"),
    name,
    company,
    email,
    phone,
    country,
    address,
    notes,
    status: status || "Prospect",
  });

  sendSuccess(res, 201, "Customer created", customer);
});

// ─── PUT /api/customers/:id ───────────────────────────────────────────────────
const updateCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return sendError(res, 404, "Customer not found");

  const { name, company, email, phone, country, address, notes, status } = req.body;

  Object.assign(customer, {
    ...(name && { name }),
    ...(company && { company }),
    ...(email && { email: email.toLowerCase() }),
    ...(phone !== undefined && { phone }),
    ...(country && { country }),
    ...(address !== undefined && { address }),
    ...(notes !== undefined && { notes }),
    ...(status && { status }),
  });

  await customer.save();
  sendSuccess(res, 200, "Customer updated", customer);
});

// ─── DELETE /api/customers/:id ────────────────────────────────────────────────
const deleteCustomer = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return sendError(res, 404, "Customer not found");

  // Cascade: remove linked orders and inquiries
  await Promise.all([
    Order.deleteMany({ customerId: customer._id }),
    Inquiry.deleteMany({ customerId: customer._id }),
  ]);

  await customer.deleteOne();
  sendSuccess(res, 200, "Customer and all related records deleted", { id: req.params.id });
});

module.exports = {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
