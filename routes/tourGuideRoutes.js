const express = require("express");
const router = express.Router();
const TourGuideApplication = require("../models/TourGuideApplication");
const verifyJWT = require("../middleware/verifyJWT");

router.post("/", verifyJWT, async (req, res) => {
  const application = req.body;
  const result = await TourGuideApplication.create(application);
  res.send(result);
});

module.exports = router;
