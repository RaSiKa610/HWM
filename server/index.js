const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const issueRoutes = require("./routes/issue.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const startEscalationJob = require("./utils/escalation.job");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/issues", issueRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Civic Chai Backend is running ☕");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");

    startEscalationJob();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo Error:", err);
    process.exit(1);
  });
