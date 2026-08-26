const ContactSubmission = require("../models/ContactSubmission");
const asyncHandler = require("../middleware/asyncHandler");
const { sendSuccess, sendError, paginationMeta } = require("../utils/apiResponse");
const { generateId } = require("../utils/generateId");
const logger = require("../utils/logger");

// ─── POST /api/contact ────────────────────────────────────────────────────────
// Public endpoint — saves form submission to DB
const submitContact = asyncHandler(async (req, res) => {
  const {
    fullName, company, email, phone,
    country, interest, subject, message,
  } = req.body;

  const submission = await ContactSubmission.create({
    displayId: generateId("contact"),
    fullName,
    company,
    email,
    phone,
    country,
    interest,
    subject,
    message,
  });

  logger.info(`New contact submission from ${email} (${country})`);

  sendSuccess(res, 201, "Enquiry received. Our team will be in touch shortly.", {
    id: submission._id,
  });
});

// ─── GET /api/contact ─────────────────────────────────────────────────────────
// Admin endpoint — list all submissions
const getAllSubmissions = asyncHandler(async (req, res) => {
  const { reviewed, search, page = 1, limit = 20 } = req.query;

  const query = {};
  if (reviewed !== undefined) query.reviewed = reviewed === "true";
  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { country: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [total, submissions] = await Promise.all([
    ContactSubmission.countDocuments(query),
    ContactSubmission.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
  ]);

  sendSuccess(
    res, 200, "Contact submissions retrieved",
    submissions,
    paginationMeta(total, page, limit)
  );
});

// ─── GET /api/contact/:id ─────────────────────────────────────────────────────
const getSubmissionById = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findById(req.params.id);
  if (!submission) return sendError(res, 404, "Submission not found");
  sendSuccess(res, 200, "Submission retrieved", submission);
});

// ─── PATCH /api/contact/:id/reviewed ─────────────────────────────────────────
const markReviewed = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findByIdAndUpdate(
    req.params.id,
    { reviewed: req.body.reviewed !== false },
    { new: true }
  );
  if (!submission) return sendError(res, 404, "Submission not found");
  sendSuccess(res, 200, "Submission updated", submission);
});

// ─── DELETE /api/contact/:id ──────────────────────────────────────────────────
const deleteSubmission = asyncHandler(async (req, res) => {
  const submission = await ContactSubmission.findById(req.params.id);
  if (!submission) return sendError(res, 404, "Submission not found");
  await submission.deleteOne();
  sendSuccess(res, 200, "Submission deleted", { id: req.params.id });
});

module.exports = {
  submitContact,
  getAllSubmissions,
  getSubmissionById,
  markReviewed,
  deleteSubmission,
};
