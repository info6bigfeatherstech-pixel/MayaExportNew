const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { validateCreateProduct, validateUpdateProduct } = require("../validators/productValidator");
const validateObjectId = require("../middleware/validateObjectId");
const { uploadMultiple } = require("../services/uploadService");

/**
 * @route   GET  /api/products
 * @desc    Get all products
 * @query   search, category, status, page, limit
 */
router.get("/", getAllProducts);

/**
 * @route   GET  /api/products/:id
 * @desc    Get a single product by ID or displayId (e.g. GE-001)
 */
router.get("/:id", validateObjectId("id"), getProductById);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 */
router.post("/", uploadMultiple, validateCreateProduct, createProduct);

/**
 * @route   PUT  /api/products/:id
 * @desc    Update a product by ID or displayId (e.g. GE-001)
 */
router.put("/:id", validateObjectId("id"), uploadMultiple, validateUpdateProduct, updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID or displayId (e.g. GE-001)
 */
router.delete("/:id", validateObjectId("id"), deleteProduct);

module.exports = router;
