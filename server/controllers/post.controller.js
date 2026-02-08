const Post = require("../models/Post");

// 📰 GET /api/posts
exports.getPostFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "issue",
        select: "title description location images status createdAt",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    console.error("Post Feed Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to load posts",
    });
  }
};

// 🔼 UPVOTE
exports.upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.upvotedBy.includes(req.user.id)) {
      return res.status(400).json({ message: "Already upvoted" });
    }

    post.upvotes++;
    post.upvotedBy.push(req.user.id);
    await post.save();

    res.json({ success: true, upvotes: post.upvotes });
  } catch {
    res.status(500).json({ message: "Upvote failed" });
  }
};

// ❤️ LIKE
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likedBy.includes(req.user.id)) {
      return res.status(400).json({ message: "Already liked" });
    }

    post.likes++;
    post.likedBy.push(req.user.id);
    await post.save();

    res.json({ success: true, likes: post.likes });
  } catch {
    res.status(500).json({ message: "Like failed" });
  }
};
