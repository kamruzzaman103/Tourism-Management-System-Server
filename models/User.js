// models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   photo: String,
//   role: { type: String, default: "tourist" }
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  photo: String,
  bio: String,
  role: { type: String, enum: ['tourist', 'tour_guide', 'admin'], default: 'tourist' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;




