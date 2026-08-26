const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { validateCategory } = require("../validators/categoryValidator");
const validateObjectId = require("../middleware/validateObjectId");
const { uploadSingle } = require("../services/uploadService");

/**
 * @route   GET  /api/categories
 * @desc    Get all categories (with optional search & status filter)
 */
router.get("/", getAllCategories);

/**
 * @route   GET  /api/categories/:id
 * @desc    Get a single category by MongoDB ObjectId
 */
router.get("/:id", validateObjectId("id"), getCategoryById);

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @body    name, slug?, description?, image?, subcategories (comma-sep or array), status?
 */
router.post("/", uploadSingle, validateCategory, createCategory);

/**
 * @route   PUT  /api/categories/:id
 * @desc    Update a category
 */
router.put("/:id", validateObjectId("id"), uploadSingle, validateCategory, updateCategory);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category
 */
router.delete("/:id", validateObjectId("id"), deleteCategory);

module.exports = router;
