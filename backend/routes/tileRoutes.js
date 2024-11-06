// backend/routes/tileRoutes.js
const express = require('express');
const { getTiles } = require('../controllers/tileController');
const router = express.Router();

router.get('/', getTiles);

module.exports = router;
