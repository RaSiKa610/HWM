const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Civic Chai Backend is running ☕");
});

const PORT = process.env.PORT || 5000;

console.log("👉 Starting server...");
console.log(
  "👉 Mongo URI:",
  process.env.MONGO_URI.replace(/:\/\/.*@/, "://***@")
);

// ⛔ DO NOT add TLS / family / shard configs
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err);
    process.exit(1);
  });
