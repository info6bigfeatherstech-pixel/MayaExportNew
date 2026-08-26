/**
 * Generates human-readable prefixed IDs that mirror the frontend's
 * existing ID conventions (ORD-XXXX, INQ-XXX, CUS-XXXX, etc.).
 *
 * In production these are just for display. MongoDB _id is the actual PK.
 */

const PREFIXES = {
  order: "ORD",
  inquiry: "INQ",
  customer: "CUS",
  product: "PRD",
  category: "CAT",
  contact: "CTQ",
};

/**
 * Generate a sequential-style display ID.
 * Uses the last 6 digits of current timestamp + a tiny random suffix
 * to avoid collisions in rapid concurrent inserts.
 *
 * @param {"order"|"inquiry"|"customer"|"product"|"category"|"contact"} type
 * @returns {string}  e.g. "ORD-208712"
 */
const generateId = (type) => {
  const prefix = PREFIXES[type] || "ID";
  const ts = Date.now().toString().slice(-5);
  const rand = Math.floor(Math.random() * 90 + 10); // 10–99
  return `${prefix}-${ts}${rand}`;
};

module.exports = { generateId, PREFIXES };
