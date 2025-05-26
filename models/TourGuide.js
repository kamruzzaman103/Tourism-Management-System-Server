const mongoose = require("mongoose");

const tourGuideSchema = new mongoose.Schema({
  name: String,
  photo: String,
  experience: String,
  contact: String,
  bio: String,
});

module.exports = mongoose.model("TourGuide", tourGuideSchema);
