const express = require("express");
const multer = require("multer");
const { ObjectId } = require("mongodb");
const Story = require("../models/Story");
const verifyJWT = require("../middleware/verifyJWT");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// ✅ Ensure folder exists
const uploadDir = path.join(__dirname, "..", "uploads", "stories");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ✅ POST route to add story
router.post("/", verifyJWT, upload.array("images"), async (req, res) => {
  try {
    const { title, description, email } = req.body;
    const images = req.files?.map((file) => file.filename) || [];

    if (!title || !description || images.length === 0) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const story = {
      userId: req.user?.id,
      userName: req.user?.name,
      userPhoto: req.user?.photo,
      email,
      title,
      description,
      images,
    };

    const result = await Story.collection.insertOne(story);
    res.send({ insertedId: result.insertedId });
  } catch (err) {
    console.error("Story upload error:", err);
    res.status(500).send({ error: "Story creation failed" });
  }
});

router.get("/my-stories", verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const stories = await Story.find({ userId });
    res.send(stories);
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch stories" });
  }
});

router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    const storyId = req.params.id;
    const result = await Story.deleteOne({ _id: storyId, userId: req.user.id });
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: "Failed to delete story" });
  }
});

router.get("/:id", verifyJWT, async (req, res) => {
  const id = req.params.id;
  const story = await Story.findOne({ _id: id, userId: req.user.id });
  res.send(story);
});

router.patch("/remove-image/:id", verifyJWT, async (req, res) => {
  const { imageName } = req.body;
  const result = await Story.updateOne(
    { _id: req.params.id, userId: req.user.id },
    { $pull: { images: imageName } }
  );
  res.send(result);
});



router.patch('/update/:id', verifyJWT, upload.array('images'), async (req, res) => {
  const { title, description } = req.body;
  const newImages = req.files.map(file => file.filename);

  const result = await Story.updateOne(
    { _id: req.params.id, userId: req.user.id },
    {
      $set: { title, description },
      $push: { images: { $each: newImages } }
    }
  );
  res.send(result);
});






module.exports = router;
