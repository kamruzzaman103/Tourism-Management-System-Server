const express = require('express');
const router = express.Router();
const { addPackage, getPackage, getAllPackages} = require('../controllers/packageController');

const verifyJWT = require('../middleware/verifyJWT');
const verifyAdmin = require('../middleware/verifyAdmin');

// POST: Add a new package (admin only)
router.post('/add', verifyJWT, verifyAdmin, addPackage);
router.get('/:id', getPackage);
router.get('/', getAllPackages);

module.exports = router;
