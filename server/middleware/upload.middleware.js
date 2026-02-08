const multer = require("multer");
const path = require("path");

// 📦 Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// 🚫 NO fileFilter for now (important)
// Windows screenshots sometimes come as application/octet-stream
// which was causing files to be silently dropped
const upload = multer({
  storage: storage,
});

module.exports = upload;
