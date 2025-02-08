// routes/geocoding.js

const express = require('express');
const router = express.Router();
const { searchLocations } = require('../controllers/geocodingController');

router.get('/', searchLocations);

module.exports = router;