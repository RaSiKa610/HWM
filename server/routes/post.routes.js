const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/auth.middleware");
const {
  getPostFeed,
  upvotePost,
  likePost,
} = require("../controllers/post.controller");

// 📰 Feed
router.get("/", getPostFeed);

// 🔼 Engagement
router.put("/:id/upvote", protect, upvotePost);
router.put("/:id/like", protect, likePost);

module.exports = router;
