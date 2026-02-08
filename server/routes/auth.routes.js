const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controller");

// Temporary setup route
router.post("/register", register);

// Login
router.post("/login", login);

module.exports = router;
