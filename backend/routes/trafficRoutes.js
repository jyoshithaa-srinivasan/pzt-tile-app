const express = require('express');
const { uploadFootTraffic } = require('../controllers/trafficController');
const router = express.Router();

router.post('/foot_traffic', uploadFootTraffic);

module.exports = router;
