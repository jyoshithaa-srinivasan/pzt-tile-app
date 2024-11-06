const express = require('express');
const { uploadFootTraffic } = require('../controllers/trafficController');
const verifyToken = require('../middlewares/verifyToken'); // Ensure the user is authenticated
const verifyRole = require('../middlewares/verifyRole');   // Ensure the user has the correct role
const router = express.Router();

router.post('/foot_traffic', verifyToken,verifyRole(['admin']),uploadFootTraffic);

module.exports = router;
