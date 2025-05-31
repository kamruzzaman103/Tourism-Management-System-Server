const TourGuideApplication = require("../models/TourGuideApplication");
const User = require("../models/User");

// GET: All candidates with optional search and filter
exports.getAllCandidates = async (req, res) => {
  try {
    const { search, role } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      query.status = role; // role here refers to status: 'Pending', 'Accepted', etc.
    }

    const candidates = await TourGuideApplication.find(query);
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.acceptCandidate = async (req, res) => {
    try {
      const { id } = req.params;
  
      const application = await TourGuideApplication.findById(id);
      if (!application || !application.userId) {
        return res.status(404).json({ message: "Candidate not found or userId missing" });
      }
  
      
  
      const updatedUser = await User.findByIdAndUpdate(
        application.userId,
        { role: "tour-guide" },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await TourGuideApplication.findByIdAndDelete(id);
  
      res.json({ message: "Candidate accepted and promoted to Tour Guide." });
    } catch (error) {
      console.error("❌ Accept Error:", error);
      res.status(500).json({ error: error.message });
    }
  };
  

// DELETE: Reject candidate
exports.rejectCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await TourGuideApplication.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.json({ message: "Candidate rejected and application deleted." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
