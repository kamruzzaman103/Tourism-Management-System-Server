// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/Booking");

// // POST a new booking
// router.post("/", async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     const saved = await newBooking.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(500).json({ error: "Booking failed", message: err.message });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all bookings for a user
router.get('/:email', async (req, res) => {
  const bookings = await Booking.find({ userEmail: req.params.email });
  res.send(bookings);
});

// Cancel a booking
router.delete('/:id', async (req, res) => {
  const result = await Booking.findByIdAndDelete(req.params.id);
  res.send(result);
});

// Update booking with transactionId & change status
router.put('/payment-success/:id', async (req, res) => {
  const { transactionId } = req.body;
  const updated = await Booking.findByIdAndUpdate(
    req.params.id,
    { transactionId, status: 'in review' },
    { new: true }
  );
  res.send(updated);
});

module.exports = router;
