const Package = require('../models/Package');
const User = require('../models/User'); 
exports.addPackage = async (req, res) => {
  try {
    const {
      packageName,
      price,
      tourDate,
      galleryImages,
      about,
      tourPlan,
      tourGuides
    } = req.body;

    const newPackage = new Package({
      packageName,
      price,
      tourDate,
      galleryImages,
      about,
      tourPlan,
      tourGuides,
      createdBy: req.user._id, // assuming you’re using middleware to add user
    
    });

    await newPackage.save();
    res.status(201).json({ message: 'Package added successfully', data: newPackage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPackage = async (req, res) => {
  try {
    const { id } = req.params;

    // প্যাকেজ খোঁজা
    const packageData = await Package.findById(id);

    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // গাইডদের তথ্য আলাদা করে বের করা (যদি tourGuides অ্যারেতে user ID থাকে)
    const guides = await User.find({
      _id: { $in: packageData.tourGuides }
    }).select('-password'); // পাসওয়ার্ড বাদ দিয়ে

    res.status(200).json({
      package: packageData,
      guides
    });

  } catch (error) {
    console.error("Error fetching package:", error);
    res.status(500).json({ message: 'Failed to fetch package details' });
  }
};



// GET /api/packages → সব প্যাকেজ রিটার্ন করবে
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find(); // সব প্যাকেজ খুঁজবে
    res.status(200).json(packages); // success response
  } catch (error) {
    console.error("Error fetching packages:", error);
    res.status(500).json({ message: "Failed to fetch packages" });
  }
};

