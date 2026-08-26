const mongoose = require("mongoose");

/**
 * Order Model
 *
 * Mirrors the adminData.js order shape:
 *   id, customerId → Customer, productId → Product,
 *   customer (company name), country,
 *   products (display label), quantity, value, status, date, shipping
 */
const ORDER_STATUSES = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const orderSchema = new mongoose.Schema(
  {
    displayId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: [true, "Customer is required"],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    customer: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    products: {
      type: String,
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
    value: {
      type: Number,
      required: [true, "Order value is required"],
      min: [0, "Order value cannot be negative"],
    },
    status: {
      type: String,
      enum: {
        values: ORDER_STATUSES,
        message: `Status must be one of: ${ORDER_STATUSES.join(", ")}`,
      },
      default: "Pending",
    },
    date: {
      type: String,
      required: [true, "Order date is required"],
    },
    shipping: {
      type: String,
      trim: true,
      maxlength: [1000, "Shipping information cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

orderSchema.index({ customerId: 1 });
orderSchema.index({ productId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
module.exports.ORDER_STATUSES = ORDER_STATUSES;
