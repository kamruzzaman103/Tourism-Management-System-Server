const express = require("express");
const router = express.Router();
const {
  getAllCandidates,
  acceptCandidate,
  rejectCandidate,
} = require("../controllers/candidateController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyAdmin = require("../middleware/verifyAdmin");

// GET all candidates (Admin only)
router.get("/", verifyJWT, verifyAdmin, getAllCandidates);

// Accept a candidate
router.patch("/accept/:id", verifyJWT, verifyAdmin, acceptCandidate);

// Reject a candidate
router.delete("/reject/:id", verifyJWT, verifyAdmin, rejectCandidate);

module.exports = router;
