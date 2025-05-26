// const mongoose = require("mongoose");

// const storySchema = new mongoose.Schema({
//   title: String,
//   content: String,
//   user: String,
//   photo: String,
// });

// module.exports = mongoose.model("Story", storySchema);


const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPhoto: String,
  title: String,
  email: { type: String, unique: true },
  description: String,
  images: [String],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Story', storySchema);


