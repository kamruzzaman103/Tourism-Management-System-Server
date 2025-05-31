const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  packageName: { type: String, required: true },
  price: { type: Number, required: true },
  tourDate: { type: Date, required: true },
  galleryImages: { type: [String], required: true },
  about: { type: String, required: true },
  tourPlan: [
    {
      day: { type: String, required: true },
      plan: { type: String, required: true }
    }
  ],
  tourGuides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  tourGuideEmail: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

module.exports = mongoose.model('Package', packageSchema);
