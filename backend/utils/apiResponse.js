/**
 * Standardized API response helpers.
 * All controllers should use these so the frontend gets a consistent envelope.
 */

/**
 * Send a success response.
 * @param {import('express').Response} res
 * @param {number} statusCode
 * @param {string} message
 * @param {*} data
 * @param {object} [meta] - Optional pagination / extra metadata
 */
const sendSuccess = (res, statusCode = 200, message = "Success", data = null, meta = null) => {
  const body = { success: true, message };
  if (data !== null && data !== undefined) body.data = data;
  if (meta) body.meta = meta;
  return res.status(statusCode).json(body);
};

/**
 * Send an error response.
 */
const sendError = (res, statusCode = 500, message = "An error occurred", errors = null) => {
  const body = { success: false, message };
  if (errors) body.errors = errors;
  return res.status(statusCode).json(body);
};

/**
 * Build a pagination meta object.
 */
const paginationMeta = (total, page, limit) => ({
  total,
  page: Number(page),
  limit: Number(limit),
  pages: Math.ceil(total / limit),
});

module.exports = { sendSuccess, sendError, paginationMeta };
