const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  title: String,
  tourType: String,
  price: Number,
  photo: String,
  description: String,
});

module.exports = mongoose.model("Package", packageSchema);
