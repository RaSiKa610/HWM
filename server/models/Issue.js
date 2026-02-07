const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      default: "LOW",
    },

    status: {
      type: String,
      enum: ["REPORTED", "IN_PROGRESS", "RESOLVED", "REJECTED"],
      default: "REPORTED",
    },

    // Anonymous reporting
    isAnonymous: {
      type: Boolean,
      default: true,
    },

    // Optional contact for notifications
    contact: {
      type: String,
    },

    // Authority assignment (future)
    assignedAuthority: {
      type: String,
    },

    // AI metadata (future-ready)
    aiAnalysis: {
      issueType: String,
      confidence: Number,
      duplicateClusterId: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
