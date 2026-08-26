const Category = require("../models/Category");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess, sendError, paginationMeta } = require("../utils/apiResponse");
const { getCache, setCache, deleteCache, TTL } = require("../services/cacheService");
const { generateId } = require("../utils/generateId");

const CACHE_KEY = "categories:all";

// ─── GET /api/categories ──────────────────────────────────────────────────────
const getAllCategories = asyncHandler(async (req, res) => {
  const { status, search, page = 1, limit = 100 } = req.query;

  // Cache only the full unfiltered list (most common request)
  if (!status && !search && page == 1) {
    const cached = await getCache(CACHE_KEY);
    if (cached) return sendSuccess(res, 200, "Categories retrieved (cached)", cached);
  }

  const query = {};
  if (status) query.status = status;
  if (search) query.$text = { $search: search };

  const skip = (Number(page) - 1) * Number(limit);
  const [total, categories] = await Promise.all([
    Category.countDocuments(query),
    Category.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
  ]);

  if (!status && !search && page == 1) {
    await setCache(CACHE_KEY, categories, TTL.CATEGORIES);
  }

  sendSuccess(
    res, 200, "Categories retrieved",
    categories,
    paginationMeta(total, page, limit)
  );
});

// ─── GET /api/categories/:id ──────────────────────────────────────────────────
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return sendError(res, 404, "Category not found");
  sendSuccess(res, 200, "Category retrieved", category);
});

// ─── POST /api/categories ─────────────────────────────────────────────────────
const createCategory = asyncHandler(async (req, res) => {
  let { name, slug, description, image, subcategories, status } = req.body;

  // Handle comma-separated subcategories from form data
  if (typeof subcategories === "string") {
    subcategories = subcategories.split(",").map((s) => s.trim()).filter(Boolean);
  }

  // Auto-generate slug from name
  if (!slug && name) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  // Handle uploaded image file
  if (req.file) {
    const { getFileUrl } = require("../services/uploadService");
    image = getFileUrl(req.file.filename);
  }

  const displayId = generateId("category");

  const category = await Category.create({
    displayId,
    name,
    slug,
    description,
    image,
    subcategories: subcategories || [],
    status: status || "Active",
  });

  await deleteCache(CACHE_KEY);
  sendSuccess(res, 201, "Category created", category);
});

// ─── PUT /api/categories/:id ──────────────────────────────────────────────────
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return sendError(res, 404, "Category not found");

  let { name, slug, description, image, subcategories, status } = req.body;

  if (typeof subcategories === "string") {
    subcategories = subcategories.split(",").map((s) => s.trim()).filter(Boolean);
  }

  if (name && !slug) {
    slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  if (req.file) {
    const { getFileUrl } = require("../services/uploadService");
    image = getFileUrl(req.file.filename);
  }

  Object.assign(category, {
    ...(name && { name }),
    ...(slug && { slug }),
    ...(description !== undefined && { description }),
    ...(image !== undefined && { image }),
    ...(subcategories !== undefined && { subcategories }),
    ...(status && { status }),
  });

  await category.save();
  await deleteCache(CACHE_KEY);
  sendSuccess(res, 200, "Category updated", category);
});

// ─── DELETE /api/categories/:id ───────────────────────────────────────────────
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return sendError(res, 404, "Category not found");

  await category.deleteOne();
  await deleteCache(CACHE_KEY);
  sendSuccess(res, 200, "Category deleted", { id: req.params.id });
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
