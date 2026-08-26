const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const { validateCustomer } = require("../validators/customerValidator");
const validateObjectId = require("../middleware/validateObjectId");

/**
 * @route   GET  /api/customers
 * @desc    Get all customers
 * @query   search, status, country, page, limit
 */
router.get("/", getAllCustomers);

/**
 * @route   GET  /api/customers/:id
 * @desc    Get customer profile + linked orders + inquiries
 */
router.get("/:id", validateObjectId("id"), getCustomerById);

/**
 * @route   POST /api/customers
 * @desc    Create a new customer
 * @body    name, company, email, phone, country, address, notes, status
 */
router.post("/", validateCustomer, createCustomer);

/**
 * @route   PUT  /api/customers/:id
 * @desc    Update a customer
 */
router.put("/:id", validateObjectId("id"), validateCustomer, updateCustomer);

/**
 * @route   DELETE /api/customers/:id
 * @desc    Delete customer + cascade delete orders & inquiries
 */
router.delete("/:id", validateObjectId("id"), deleteCustomer);

module.exports = router;
