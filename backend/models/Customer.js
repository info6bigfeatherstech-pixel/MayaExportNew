const mongoose = require("mongoose");

/**
 * Customer Model
 *
 * Mirrors the adminData.js customer shape:
 *   id, name, company, email, phone, country, address,
 *   notes (internal), orders (count), spend, status, joined
 *
 * Orders and Inquiries are stored in their own collections and
 * reference the customer by customerId — no embedding needed.
 * The `orders` and `spend` fields here are kept as denormalized
 * aggregates that get updated whenever an order is created/deleted.
 */
const customerSchema = new mongoose.Schema(
  {
    displayId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Contact name is required"],
      trim: true,
      maxlength: [150, "Name cannot exceed 150 characters"],
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
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
    address: {
      type: String,
      trim: true,
      maxlength: [500, "Address cannot exceed 500 characters"],
    },
    // Internal CRM notes — never exposed to the customer
    notes: {
      type: String,
      trim: true,
      maxlength: [2000, "Notes cannot exceed 2000 characters"],
    },
    // Denormalized counts / totals — updated by order hooks
    orders: {
      type: Number,
      default: 0,
      min: 0,
    },
    spend: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Prospect"],
        message: "Status must be Active or Prospect",
      },
      default: "Prospect",
    },
    // Date the customer record was created / joined
    joined: {
      type: String, // stored as formatted string to match frontend display
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Virtuals — related data (populated on demand) ────────────────────────────
customerSchema.virtual("orderHistory", {
  ref: "Order",
  localField: "_id",
  foreignField: "customerId",
});

customerSchema.virtual("inquiryHistory", {
  ref: "Inquiry",
  localField: "_id",
  foreignField: "customerId",
});

// ─── Indexes ──────────────────────────────────────────────────────────────────
customerSchema.index({ name: "text", company: "text", email: "text" });
customerSchema.index({ status: 1 });
customerSchema.index({ country: 1 });

// ─── Hook — set joined date on creation ──────────────────────────────────────
customerSchema.pre("save", function (next) {
  if (this.isNew && !this.joined) {
    const d = new Date();
    this.joined = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  next();
});

module.exports = mongoose.model("Customer", customerSchema);
