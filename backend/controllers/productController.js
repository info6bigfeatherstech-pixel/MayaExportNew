const mongoose = require("mongoose");
const Product = require("../models/Product");
const Category = require("../models/Category");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess, sendError, paginationMeta } = require("../utils/apiResponse");
const { getCache, setCache, deleteCachePattern, TTL } = require("../services/cacheService");
const { generateId } = require("../utils/generateId");
const { getFileUrl } = require("../services/uploadService");

// Helper to find a product by ObjectId OR displayId
const findProductDoc = async (idParam) => {
  if (mongoose.Types.ObjectId.isValid(idParam)) {
    const byId = await Product.findById(idParam).populate("categoryId", "name slug subcategories");
    if (byId) return byId;
  }
  return Product.findOne({ displayId: idParam }).populate("categoryId", "name slug subcategories");
};

// ─── GET /api/products ────────────────────────────────────────────────────────
const getAllProducts = asyncHandler(async (req, res) => {
  const { search, category, status, page = 1, limit = 100 } = req.query;

  const cacheKey = `products:list:${search || ""}:${category || ""}:${status || ""}:${page}:${limit}`;
  const cached = await getCache(cacheKey);
  if (cached) return sendSuccess(res, 200, "Products retrieved (cached)", cached.data, cached.meta);

  const query = {};
  if (status) query.status = status;
  if (category && category !== "All") query.category = { $regex: new RegExp(`^${category}$`, "i") };
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { productType: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { displayId: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query)
      .populate("categoryId", "name slug")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(Number(limit)),
  ]);

  const meta = paginationMeta(total, page, limit);
  await setCache(cacheKey, { data: products, meta }, TTL.PRODUCTS);

  sendSuccess(res, 200, "Products retrieved", products, meta);
});

// ─── GET /api/products/:id ────────────────────────────────────────────────────
const getProductById = asyncHandler(async (req, res) => {
  const product = await findProductDoc(req.params.id);
  if (!product) return sendError(res, 404, "Product not found");
  sendSuccess(res, 200, "Product retrieved", product);
});

// ─── POST /api/products ───────────────────────────────────────────────────────
const createProduct = asyncHandler(async (req, res) => {
  let {
    name, categoryId, category: categoryName, productType, description, details,
    colors, sizes, moq, export: exportDest, image, images,
    status, displayId, id,
  } = req.body;

  // Resolve category
  let categoryDoc = null;
  if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
    categoryDoc = await Category.findById(categoryId);
  } else if (categoryName) {
    categoryDoc = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName}$`, "i") } });
  }

  if (!categoryDoc) {
    // Fallback to first available category
    categoryDoc = await Category.findOne({});
  }

  // Handle multi-file upload
  if (req.files && req.files.length > 0) {
    images = req.files.map((f) => getFileUrl(f.filename));
    image = images[0];
  } else if (req.file) {
    image = getFileUrl(req.file.filename);
    images = [image];
  }

  // Normalize array fields
  if (typeof colors === "string") colors = colors.split(",").map((s) => s.trim()).filter(Boolean);
  if (typeof sizes === "string") sizes = sizes.split(",").map((s) => s.trim()).filter(Boolean);
  if (typeof images === "string") images = images.split(",").map((s) => s.trim()).filter(Boolean);

  const product = await Product.create({
    displayId: displayId || id || generateId("product"),
    name,
    categoryId: categoryDoc?._id,
    category: categoryDoc?.name || categoryName || "Garments",
    productType: productType || "",
    description: description || "",
    details: details || "",
    colors: colors || [],
    sizes: sizes || [],
    moq: moq || "",
    export: exportDest || "Worldwide",
    image: image || (images && images[0]) || "/placeholder.jpg",
    images: images || (image ? [image] : []),
    status: status || "Active",
  });

  await deleteCachePattern("products:*");
  sendSuccess(res, 201, "Product created", product);
});

// ─── PUT /api/products/:id ────────────────────────────────────────────────────
const updateProduct = asyncHandler(async (req, res) => {
  const product = await findProductDoc(req.params.id);
  if (!product) return sendError(res, 404, "Product not found");

  let {
    name, categoryId, category: categoryName, productType, description, details,
    colors, sizes, moq, export: exportDest, image, images,
    status, displayId, id,
  } = req.body;

  // Resolve updated category if provided
  if (categoryId) {
    if (mongoose.Types.ObjectId.isValid(categoryId)) {
      const cat = await Category.findById(categoryId);
      if (cat) {
        product.categoryId = cat._id;
        product.category = cat.name;
      }
    } else {
      const cat = await Category.findOne({ name: { $regex: new RegExp(`^${categoryId}$`, "i") } });
      if (cat) {
        product.categoryId = cat._id;
        product.category = cat.name;
      }
    }
  } else if (categoryName) {
    const cat = await Category.findOne({ name: { $regex: new RegExp(`^${categoryName}$`, "i") } });
    if (cat) {
      product.categoryId = cat._id;
      product.category = cat.name;
    }
  }

  // Handle new image uploads
  if (req.files && req.files.length > 0) {
    const uploaded = req.files.map((f) => getFileUrl(f.filename));
    images = [...(product.images || []), ...uploaded];
    image = image || uploaded[0];
  } else if (req.file) {
    image = getFileUrl(req.file.filename);
  }

  if (typeof colors === "string") colors = colors.split(",").map((s) => s.trim()).filter(Boolean);
  if (typeof sizes === "string") sizes = sizes.split(",").map((s) => s.trim()).filter(Boolean);
  if (typeof images === "string") images = images.split(",").map((s) => s.trim()).filter(Boolean);

  const updatedDisplayId = displayId || id;

  Object.assign(product, {
    ...(name && { name }),
    ...(updatedDisplayId && { displayId: updatedDisplayId }),
    ...(productType !== undefined && { productType }),
    ...(description !== undefined && { description }),
    ...(details !== undefined && { details }),
    ...(colors !== undefined && { colors }),
    ...(sizes !== undefined && { sizes }),
    ...(moq !== undefined && { moq }),
    ...(exportDest !== undefined && { export: exportDest }),
    ...(image !== undefined && { image }),
    ...(images !== undefined && { images }),
    ...(status && { status }),
  });

  await product.save();
  await deleteCachePattern("products:*");
  sendSuccess(res, 200, "Product updated", product);
});

// ─── DELETE /api/products/:id ─────────────────────────────────────────────────
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await findProductDoc(req.params.id);
  if (!product) return sendError(res, 404, "Product not found");

  await product.deleteOne();
  await deleteCachePattern("products:*");
  sendSuccess(res, 200, "Product deleted", { id: req.params.id });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
