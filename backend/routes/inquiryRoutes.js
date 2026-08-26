const express = require("express");
const router = express.Router();

const {
  getAllInquiries,
  getInquiryById,
  createInquiry,
  updateInquiry,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");

const { validateInquiry, validateInquiryStatus } = require("../validators/inquiryValidator");
const validateObjectId = require("../middleware/validateObjectId");

/**
 * @route   GET  /api/inquiries
 * @desc    Get all inquiries
 * @query   search, status, customerId, page, limit
 */
router.get("/", getAllInquiries);

/**
 * @route   GET  /api/inquiries/:id
 * @desc    Get a single inquiry with populated customer & product
 */
router.get("/:id", validateObjectId("id"), getInquiryById);

/**
 * @route   POST /api/inquiries
 * @desc    Create an inquiry
 * @body    customerId, productId?, quantity?, message, date, status?
 */
router.post("/", validateInquiry, createInquiry);

/**
 * @route   PUT  /api/inquiries/:id
 * @desc    Update an inquiry (full update)
 */
router.put("/:id", validateObjectId("id"), validateInquiry, updateInquiry);

/**
 * @route   PATCH /api/inquiries/:id/status
 * @desc    Update inquiry status only
 * @body    { status: "Converted" }
 */
router.patch("/:id/status", validateObjectId("id"), validateInquiryStatus, updateInquiryStatus);

/**
 * @route   DELETE /api/inquiries/:id
 * @desc    Delete an inquiry
 */
router.delete("/:id", validateObjectId("id"), deleteInquiry);

module.exports = router;
