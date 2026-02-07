const express = require("express");
const router = express.Router();

const {
  createIssue,
  getAllIssues,
} = require("../controllers/issue.controller");

// Create issue
router.post("/", createIssue);

// Get all issues (admin / testing)
router.get("/", getAllIssues);

module.exports = router;
