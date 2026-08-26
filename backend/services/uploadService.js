const multer = require("multer");
const path = require("path");
const fs = require("fs");

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
const MAX_FILE_SIZE = (Number(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024;

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ─── Storage ──────────────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    // Sanitize original filename + add timestamp for uniqueness
    const ext = path.extname(file.originalname).toLowerCase();
    const base = path
      .basename(file.originalname, ext)
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()
      .slice(0, 40);
    cb(null, `${base}-${Date.now()}${ext}`);
  },
});

// ─── File filter ──────────────────────────────────────────────────────────────
const fileFilter = (_req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|avif|gif/;
  const extOk = allowed.test(path.extname(file.originalname).toLowerCase());
  const mimeOk = allowed.test(file.mimetype);

  if (extOk && mimeOk) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, PNG, WebP, AVIF, and GIF images are accepted."
      )
    );
  }
};

// ─── Multer instances ─────────────────────────────────────────────────────────

/** Single image upload (e.g. category thumbnail) */
const uploadSingle = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
}).single("image");

/** Multiple image upload (up to 10 — for product gallery) */
const uploadMultiple = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_FILE_SIZE },
}).array("images", 10);

/**
 * Middleware wrapper that forwards multer errors to Express error handler.
 */
const handleUpload = (multerFn) => (req, res, next) => {
  multerFn(req, res, (err) => {
    if (!err) return next();
    err.statusCode = 400;
    next(err);
  });
};

/**
 * Build a public URL path for an uploaded file.
 * @param {string} filename
 * @returns {string}
 */
const getFileUrl = (filename) => `/uploads/${filename}`;

module.exports = {
  uploadSingle: handleUpload(uploadSingle),
  uploadMultiple: handleUpload(uploadMultiple),
  getFileUrl,
};
