const mongoose = require("mongoose");

const TourGuideApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, //  ensure it's required
  },
  name: String,
  email: String,
  photo: String,
  title: String,
  reason: String,
  cvLink: String,
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("TourGuideApplication", TourGuideApplicationSchema);
