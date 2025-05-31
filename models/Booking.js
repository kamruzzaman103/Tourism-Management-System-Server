const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  packageName: String,
  touristName: String,
  touristEmail: String,
  touristImage: String,
  price: Number,
  tourGuideEmail:String,
  date: Date,
  guide: String,
  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);


