// backend/routes/calculateCostRoutes.js
const express = require('express');
const { calculateCost } = require('../controllers/costController');
const router = express.Router();

router.get('/:tile_id', calculateCost);

module.exports = router;
