const express = require("express");
const router = express.Router();

const {
  submitContact,
  getAllSubmissions,
  getSubmissionById,
  markReviewed,
  deleteSubmission,
} = require("../controllers/contactController");

const { validateContact } = require("../validators/contactValidator");
const validateObjectId = require("../middleware/validateObjectId");
const { contactRateLimiter } = require("../middleware/rateLimiter");

/**
 * @route   POST /api/contact
 * @desc    Public contact form submission — saved to DB
 * @access  Public (rate-limited: 10 requests/hour per IP)
 */
router.post("/", contactRateLimiter, validateContact, submitContact);

/**
 * @route   GET /api/contact
 * @desc    Get all contact submissions (admin)
 * @query   reviewed, search, page, limit
 */
router.get("/", getAllSubmissions);

/**
 * @route   GET /api/contact/:id
 * @desc    Get a single contact submission
 */
router.get("/:id", validateObjectId("id"), getSubmissionById);

/**
 * @route   PATCH /api/contact/:id/reviewed
 * @desc    Mark a submission as reviewed
 * @body    { reviewed: true }
 */
router.patch("/:id/reviewed", validateObjectId("id"), markReviewed);

/**
 * @route   DELETE /api/contact/:id
 * @desc    Delete a contact submission
 */
router.delete("/:id", validateObjectId("id"), deleteSubmission);

module.exports = router;
