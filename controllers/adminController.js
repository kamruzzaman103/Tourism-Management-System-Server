const Payment = require('../models/Payment');
const User = require('../models/User');
const Package = require('../models/Package');
const Story = require('../models/Story');

exports.getAdminStats = async (req, res) => {
  try {
    const totalPaymentResult = await Payment.aggregate([
      { $group: { _id: null, total: { $sum: '$price' } } }
    ]);
    const totalPayment = totalPaymentResult[0]?.total || 0;

    const totalTourGuides = await User.countDocuments({ role: 'tour-guide' });
    const totalClients = await User.countDocuments({ role: 'tourist' });
    const totalPackages = await Package.countDocuments();
    const totalStories = await Story.countDocuments();

    res.json({
      totalPayment,
      totalTourGuides,
      totalClients,
      totalPackages,
      totalStories
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
