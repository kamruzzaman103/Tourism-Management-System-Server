const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { getUserByEmail, updateUserByEmail } = require('../controllers/userController');


router.post("/", async (req, res) => {
  const { name, email, photo, role } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).send({ message: "User already exists" });

    const result = await User.create({ name, email, photo, role });
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send({ message: "Server error", error: error.message });
  }
});

// Get user profile
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch user' });
  }
});



// Update user profile (excluding role and email)
router.put('/:email', async (req, res) => {
  const { name, photo, bio } = req.body;
  try {
    const updated = await User.findOneAndUpdate(
      { email: req.params.email },
      { name, photo, bio },
      { new: true }
    );
    if (!updated) return res.status(404).send({ error: 'User not found' });
    res.send(updated);
  } catch (err) {
    res.status(500).send({ error: 'Update failed' });
  }
});

router.get("/", async (req, res) => {
  const guides = await User.find({ role: "tour-guide" });
  res.json(guides);
});



router.get('/profile/:email', getUserByEmail);

// Update user (except email & role)
router.put('/profile/:email', updateUserByEmail);


module.exports = router;
