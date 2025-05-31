


const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');



router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    const saved = await newBooking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Booking failed", message: err.message });
  }
});


// Get all bookings for a user
router.get('/:id', async (req, res) => {
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
