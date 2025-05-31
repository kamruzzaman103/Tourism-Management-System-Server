const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const jwtRoute = require('./routes/jwt');
const User = require('./models/User'); // ✅ Mongoose Model Import
const Package = require("./models/Package");
const Guide = require("./models/TourGuide");
const Story = require("./models/Story");
const bookingRoutes = require("./routes/booking");
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const storyRoutes = require('./routes/storyRoutes');
const tourGuideRoutes = require('./routes/tourGuideRoutes');
const packageRoutes = require('./routes/packageRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const assignedToursRoute = require("./routes/assignedTours");


dotenv.config();
const app = express();

connectDB();











app.use(cors());
app.use(express.json());
app.use('/jwt', jwtRoute);
app.use("/api/bookings", bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/stories', storyRoutes);
app.use('/uploads/stories', express.static('uploads/stories'));
app.use('/api/tour-guide-applications', tourGuideRoutes);
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/packages', packageRoutes);
app.use('/api/candidates', candidateRoutes);
app.use("/api/assigned-tours", assignedToursRoute);




// ✅ POST /users
app.post("/users", async (req, res) => {
  const { name, email, photo, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.send({ message: "user already exists" });
  const result = await User.create({ name, email, photo, role });
  res.send(result);
});

// ✅ GET /users/role/:email
app.get("/users/role/:email", async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  res.send({ role: user?.role || "tourist" });
});

// Route to get all users
app.get('/users', async (req, res) => {
  const { search, role } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
    ];
  }

  if (role) {
    query.role = role;
  }

  try {
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.get("/packages/random", async (req, res) => {
  const randomPackages = await Package.aggregate([{ $sample: { size: 3 } }]);
  res.send(randomPackages);
});

app.get("/guides/random", async (req, res) => {
  const randomGuides = await Guide.aggregate([{ $sample: { size: 6 } }]);
  res.send(randomGuides);
});

app.get("/stories/random", async (req, res) => {
  const randomStories = await Story.aggregate([{ $sample: { size: 4 } }]);
  res.send(randomStories);
});


// Get all stories
app.get('/stories', async (req, res) => {
  const guideId = req.query.guideId;
  let filter = {};
  if (guideId) {
    filter = { guideId };
  }

  const stories = await Story.find(filter);
  res.send(stories);
});

// Get all packages
app.get('/packages', async (req, res) => {
  const packages = await Package.find();
  res.send(packages);
});

// Get single tour guide
// app.get('/tour-guides/:id', async (req, res) => {
//   const guide = await TourGuide.findById(req.params.id);
//   res.send(guide);
// });

// Add a booking (example - you'll need this for Book Now later)
// app.post('/bookings', async (req, res) => {
//   // You can create a Booking model similarly and save it
//   // Status: pending
//   res.send({ success: true, message: "Booking created with status: pending" });
// });




app.get('/', (req, res) => {
  res.send('Tourism Management System API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
