const mongoose = require("mongoose");

/**
 * Inquiry Model
 *
 * Mirrors the adminData.js inquiry shape and Contact.jsx form:
 *   id, customerId → Customer, productId → Product,
 *   name, company, country (denormalized from Customer),
 *   product (name — denormalized from Product),
 *   quantity, message, status, date
 *
 * Statuses: New | Contacted | In Progress | Converted | Closed
 */
const INQUIRY_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Converted",
  "Closed",
];

const inquirySchema = new mongoose.Schema(
  {
    // Human-readable display ID — e.g. INQ-421
    displayId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    // ── Relationships ────────────────────────────────────────────────────────
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer is required"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    // ── Denormalized display fields ──────────────────────────────────────────
    name: { type: String, trim: true },       // customer contact name
    company: { type: String, trim: true },    // customer company
    country: { type: String, trim: true },    // customer country
    product: { type: String, trim: true },    // product name

    // ── Inquiry details ──────────────────────────────────────────────────────
    quantity: {
      type: Number,
      min: [1, "Quantity must be at least 1"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: {
        values: INQUIRY_STATUSES,
        message: `Status must be one of: ${INQUIRY_STATUSES.join(", ")}`,
      },
      default: "New",
    },
    date: {
      type: String,
      required: [true, "Inquiry date is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
inquirySchema.index({ customerId: 1 });
inquirySchema.index({ productId: 1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });

module.exports = mongoose.model("Inquiry", inquirySchema);
module.exports.INQUIRY_STATUSES = INQUIRY_STATUSES;
