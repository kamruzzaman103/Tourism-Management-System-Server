

const mongoose = require("mongoose");

const assignedTourSchema = new mongoose.Schema(
  {
    packageName: { type: String, required: true },
    touristName: { type: String, required: true },
    touristEmail: { type: String, required: true },
    touristImage: String, // optional
    tourDate: { type: Date, required: true },
    price: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Pending", "In Review", "Accepted", "Rejected"],
      default: "Pending",
    },

    tourGuideEmail: { type: String, required: true },

    // Reference to the user who booked
    touristId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Optional: Reference to tour guide user (if needed)
    
  },
  { timestamps: true } // Adds createdAt and updatedAt
);

module.exports = mongoose.model("AssignedTour", assignedTourSchema);
