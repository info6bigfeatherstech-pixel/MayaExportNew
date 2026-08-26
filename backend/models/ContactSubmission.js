const mongoose = require("mongoose");

/**
 * ContactSubmission Model
 *
 * Persists submissions from the public Contact.jsx form:
 *   fullName, company, email, phone, country,
 *   interest (product category), subject, message
 *
 * These are separate from Inquiries because they come from
 * anonymous website visitors, not yet linked to a Customer record.
 * Admin can later convert a contact submission into a proper Inquiry.
 */
const contactSubmissionSchema = new mongoose.Schema(
  {
    displayId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [150, "Name cannot exceed 150 characters"],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      trim: true,
      maxlength: [30, "Phone number cannot exceed 30 characters"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
      maxlength: [100, "Country cannot exceed 100 characters"],
    },
    // Product category interest (Garments, Footwear, Fabrics, etc.)
    interest: {
      type: String,
      trim: true,
      maxlength: [100, "Interest cannot exceed 100 characters"],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [300, "Subject cannot exceed 300 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
    // Track whether admin has reviewed this submission
    reviewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
contactSubmissionSchema.index({ email: 1 });
contactSubmissionSchema.index({ reviewed: 1 });
contactSubmissionSchema.index({ createdAt: -1 });

module.exports = mongoose.model("ContactSubmission", contactSubmissionSchema);
