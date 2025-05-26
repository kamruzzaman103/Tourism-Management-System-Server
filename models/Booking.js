// const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   packageName: String,
//   touristName: String,
//   touristEmail: String,
//   touristImage: String,
//   price: Number,
//   date: Date,
//   guide: String,
//   status: {
//     type: String,
//     default: "pending"
//   }
// }, { timestamps: true });

// module.exports = mongoose.model("Booking", bookingSchema);

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userEmail: String,
  packageName: String,
  tourGuideName: String,
  tourDate: String,
  tourPrice: Number,
  status: { type: String, enum: ['pending', 'in review', 'accepted', 'rejected'], default: 'pending' },
  transactionId: String
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
