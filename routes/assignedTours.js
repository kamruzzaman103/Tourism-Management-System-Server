// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Get all assigned bookings for a tour guide
router.get('/:tourGuideEmail', async (req, res) => {
  const { tourGuideEmail } = req.params;
  try {
    const bookings = await Booking.find({ tourGuideEmail });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Accept tour (change status from "in-review" to "accepted")
router.patch('/accept/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'accepted' },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to accept tour' });
  }
});

// Reject tour (change status from "in-review" to "rejected")
router.patch('/reject/:id', async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject tour' });
  }
});

module.exports = router;
