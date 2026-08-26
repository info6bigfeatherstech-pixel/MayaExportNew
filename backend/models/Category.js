const mongoose = require("mongoose");

/**
 * Category Model
 *
 * Mirrors the frontend adminData.js category shape:
 *   id, name, slug, description, image, subcategories[], status
 *
 * Fully dynamic — subcategories is a free-form string array, so new
 * subcategories can be added or removed without schema changes.
 */
const categorySchema = new mongoose.Schema(
  {
    // Human-readable display ID matching frontend convention (e.g. CAT-12345)
    displayId: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-z0-9-]+$/,
        "Slug may only contain lowercase letters, numbers, and hyphens",
      ],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    image: {
      type: String,
      trim: true,
    },
    /**
     * Dynamic subcategory list — stored as string array.
     * Admin can add or remove entries freely from the Admin Panel.
     */
    subcategories: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: {
        values: ["Active", "Draft"],
        message: "Status must be Active or Draft",
      },
      default: "Active",
    },
  },
  {
    timestamps: true, // adds createdAt + updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────────
categorySchema.index({ name: "text", slug: "text" }); // full-text search
categorySchema.index({ status: 1 });

// ─── Auto-generate slug from name if not provided ─────────────────────────────
categorySchema.pre("save", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

module.exports = mongoose.model("Category", categorySchema);
