const Product = require("../models/Product");
const Category = require("../models/Category");
const Customer = require("../models/Customer");
const Order = require("../models/Order");
const Inquiry = require("../models/Inquiry");
const ContactSubmission = require("../models/ContactSubmission");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess } = require("../utils/apiResponse");
const { getCache, setCache, TTL } = require("../services/cacheService");

// ─── GET /api/dashboard/stats ─────────────────────────────────────────────────
const getDashboardStats = asyncHandler(async (req, res) => {
  const CACHE_KEY = "dashboard:stats";
  const cached = await getCache(CACHE_KEY);
  if (cached) return sendSuccess(res, 200, "Dashboard stats (cached)", cached);

  // Run all aggregations in parallel for maximum performance
  const [
    totalProducts,
    activeProducts,
    draftProducts,
    totalCategories,
    activeCategories,
    totalCustomers,
    activeCustomers,
    prospectCustomers,
    totalOrders,
    pendingOrders,
    processingOrders,
    shippedOrders,
    deliveredOrders,
    cancelledOrders,
    totalInquiries,
    newInquiries,
    activeInquiries,
    convertedInquiries,
    totalContactSubmissions,
    unreviewedSubmissions,
    recentOrders,
    recentInquiries,
    orderValueResult,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ status: "Active" }),
    Product.countDocuments({ status: "Draft" }),
    Category.countDocuments(),
    Category.countDocuments({ status: "Active" }),
    Customer.countDocuments(),
    Customer.countDocuments({ status: "Active" }),
    Customer.countDocuments({ status: "Prospect" }),
    Order.countDocuments(),
    Order.countDocuments({ status: "Pending" }),
    Order.countDocuments({ status: "Processing" }),
    Order.countDocuments({ status: "Shipped" }),
    Order.countDocuments({ status: "Delivered" }),
    Order.countDocuments({ status: "Cancelled" }),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: "New" }),
    Inquiry.countDocuments({ status: { $in: ["New", "Contacted", "In Progress"] } }),
    Inquiry.countDocuments({ status: "Converted" }),
    ContactSubmission.countDocuments(),
    ContactSubmission.countDocuments({ reviewed: false }),
    // Recent orders for dashboard widget (last 5)
    Order.find()
      .populate("customerId", "name company country")
      .populate("productId", "name image")
      .sort({ createdAt: -1 })
      .limit(5),
    // Recent inquiries
    Inquiry.find()
      .populate("customerId", "name company country")
      .sort({ createdAt: -1 })
      .limit(5),
    // Total revenue from delivered orders
    Order.aggregate([
      { $match: { status: "Delivered" } },
      { $group: { _id: null, total: { $sum: "$value" } } },
    ]),
  ]);

  const totalRevenue = orderValueResult?.[0]?.total || 0;
  const openOrders = pendingOrders + processingOrders;

  const stats = {
    products: {
      total: totalProducts,
      active: activeProducts,
      draft: draftProducts,
    },
    categories: {
      total: totalCategories,
      active: activeCategories,
    },
    customers: {
      total: totalCustomers,
      active: activeCustomers,
      prospects: prospectCustomers,
    },
    orders: {
      total: totalOrders,
      open: openOrders,
      pending: pendingOrders,
      processing: processingOrders,
      shipped: shippedOrders,
      delivered: deliveredOrders,
      cancelled: cancelledOrders,
    },
    inquiries: {
      total: totalInquiries,
      new: newInquiries,
      active: activeInquiries,
      converted: convertedInquiries,
    },
    contactSubmissions: {
      total: totalContactSubmissions,
      unreviewed: unreviewedSubmissions,
    },
    revenue: {
      totalDelivered: totalRevenue,
    },
    recentOrders,
    recentInquiries,
  };

  await setCache(CACHE_KEY, stats, TTL.DASHBOARD);
  sendSuccess(res, 200, "Dashboard stats retrieved", stats);
});

module.exports = { getDashboardStats };
