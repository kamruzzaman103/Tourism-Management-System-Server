// routes/jwt.js
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


const User = require("../models/User");

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;