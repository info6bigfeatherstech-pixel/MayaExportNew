const mongoose = require("mongoose");

/**
 * Product Model
 *
 * Mirrors the full product shape found across:
 *   src/data/products.js, garments.js, fabricsData.js,
 *   footwearData.js, homeTextileData.js, electronicsData.js
 *   and the Admin Panel form fields.
 */
const productSchema = new mongoose.Schema(
  {
    displayId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    category: {
      type: String,
      trim: true,
    },
    productType: {
      type: String,
      trim: true,
      maxlength: [100, "Product type cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    details: {
      type: String,
      trim: true,
      maxlength: [500, "Details cannot exceed 500 characters"],
    },
    colors: {
      type: [String],
      default: [],
    },
    sizes: {
      type: [String],
      default: [],
    },
    moq: {
      type: String,
      trim: true,
    },
    export: {
      type: String,
      default: "Worldwide",
      trim: true,
    },
    image: {
      type: String,
      trim: true,
      default: "/placeholder.jpg",
    },
    images: {
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
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ name: "text", description: "text", productType: "text" });
productSchema.index({ categoryId: 1, status: 1 });

productSchema.pre("save", function (next) {
  if (this.images && this.images.length > 0 && !this.image) {
    this.image = this.images[0];
  }
  if (this.image && (!this.images || this.images.length === 0)) {
    this.images = [this.image];
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
