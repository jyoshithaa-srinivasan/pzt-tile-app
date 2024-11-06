// backend/routes/calculationRoutes.js
const express = require('express');
const { calculateTiles } = require('../controllers/calculationController');
const router = express.Router();

router.post('/', calculateTiles);

module.exports = router;
