const express = require("express");
const router = express.Router();
const TourGuideApplication = require("../models/TourGuideApplication");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", verifyJWT, async (req, res) => {
  try {
    const { name, email, photo, title, reason, cvLink } = req.body;

    const userId = req.user?.id; 

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existing = await TourGuideApplication.findOne({ userId });
    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const application = await TourGuideApplication.create({
      userId, 
      name,
      email,
      photo,
      title,
      reason,
      cvLink,
    });

    res.status(201).json(application);
  } catch (error) {
    console.error("❌ Error submitting application:", error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
