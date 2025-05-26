const User = require('../models/User');

// Get user by email
exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update user (not role/email)
exports.updateUserByEmail = async (req, res) => {
  const { name, photo, phone, address } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      { name, photo, phone, address },
      { new: true }
    );
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
