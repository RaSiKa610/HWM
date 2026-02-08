const Issue = require("../models/Issue");
const Post = require("../models/Post");

// 📤 POST /api/issues
exports.createIssue = async (req, res) => {
    const Issue = require("../models/Issue");
const Post = require("../models/Post");

exports.createIssue = async (req, res) => {
  try {
    const issue = await Issue.create(req.body);

    console.log("✅ ISSUE CREATED:", issue._id);

    const post = await Post.create({
      issue: issue._id,
    });

    console.log("🔥 POST CREATED:", post._id);

    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      data: issue,
    });
  } catch (error) {
    console.error("❌ CREATE ISSUE ERROR:", error);

    res.status(400).json({
      success: false,
      message: "Failed to report issue",
      error: error.message,
    });
  }
};

  try {
    // 1️⃣ Create Issue
    const issue = await Issue.create(req.body);

    // 2️⃣ AUTO-CREATE POST (🔥 THIS WAS MISSING EARLIER)
    await Post.create({
      issue: issue._id,
    });

    res.status(201).json({
      success: true,
      message: "Issue reported successfully",
      data: issue,
    });
  } catch (error) {
    console.error("Create Issue Error:", error);

    res.status(400).json({
      success: false,
      message: "Failed to report issue",
      error: error.message,
    });
  }
};

// 📄 GET /api/issues
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch issues",
    });
  }
};

// 🔍 GET /api/issues/:id
exports.getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      data: issue,
    });
  } catch {
    res.status(400).json({
      success: false,
      message: "Invalid Issue ID",
    });
  }
};

// 🔐 PUT /api/issues/:id/status
exports.updateIssueStatus = async (req, res) => {
  try {
    const { status, assignedAuthority } = req.body;

    const allowedStatus = [
      "REPORTED",
      "IN_PROGRESS",
      "ESCALATED",
      "RESOLVED",
      "REJECTED",
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const updateData = { status, assignedAuthority };

    if (status === "RESOLVED") {
      updateData.resolvedAt = new Date();
    }

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Issue status updated",
      data: issue,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to update issue status",
    });
  }
};

// 🖼️ GET /api/issues/gallery/resolved
exports.getResolvedIssuesForGallery = async (req, res) => {
  try {
    const issues = await Issue.find({ status: "RESOLVED" }).sort({
      resolvedAt: -1,
    });

    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to load gallery",
    });
  }
};
