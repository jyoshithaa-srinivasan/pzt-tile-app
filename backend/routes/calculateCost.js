// backend/routes/pztRoutes.js
const express = require('express');
const { calculateCost } = require('../controllers/costController');
const router = express.Router();

router.get('/pzt/cost/:tile_id', calculateCost);

module.exports = router;
