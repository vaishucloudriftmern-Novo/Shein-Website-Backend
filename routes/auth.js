const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.json({ success: false, message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed });
  await user.save();

  res.json({ success: true, message: "Signup successful", user });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Wrong password. Try again next time" });

  res.json({ success: true, message: "Login successful", user });
});

module.exports = router;
