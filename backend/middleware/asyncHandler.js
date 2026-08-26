/**
 * asyncHandler — wraps async route handlers so any rejected promise
 * is passed to Express's next(err) instead of crashing the process.
 *
 * Usage:
 *   router.get('/', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
