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
      enum: ["REPORTED", "IN_PROGRESS", "ESCALATED", "RESOLVED", "REJECTED"],
      default: "REPORTED",
    },

    escalationLevel: {
      type: Number,
      default: 0,
    },

    assignedAuthority: {
      type: String,
    },

    resolvedAt: {
      type: Date,
    },

    isAnonymous: {
      type: Boolean,
      default: true,
    },

    contact: {
      type: String,
    },

    // 🔮 kept for future (not used now)
    images: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
