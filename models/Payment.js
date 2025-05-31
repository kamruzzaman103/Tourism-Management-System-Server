const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  packageName: {
    type: String,
    required: true
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  }
});

module.exports = mongoose.model('Payment', paymentSchema);


// const mongoose = require('mongoose');

// const paymentSchema = new mongoose.Schema({
//   userEmail: { type: String, required: true },
//   transactionId: { type: String, required: true, unique: true },
//   amount: { type: Number, required: true },
//   date: { type: Date, default: Date.now },
//   bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('Payment', paymentSchema);
