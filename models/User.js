

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  photo: String,
  bio: String,
  phone: String,
  address: String,
  role: { type: String, enum: ['tourist', 'tour_guide', 'admin'], default: 'tourist' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;




