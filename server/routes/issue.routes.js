const express = require("express");
const router = express.Router();

const {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  getResolvedIssuesForGallery,
} = require("../controllers/issue.controller");

const { protect } = require("../middleware/auth.middleware");

// 🖼️ Gallery route (important order)
router.get("/gallery/resolved", getResolvedIssuesForGallery);

// 👥 Citizen routes
router.post("/", createIssue);
router.get("/", getAllIssues);
router.get("/:id", getIssueById);

// 🔐 Authority route
router.put("/:id/status", protect, updateIssueStatus);

module.exports = router;
