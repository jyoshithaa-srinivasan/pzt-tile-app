// backend/server.js
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const tileRoutes = require('./routes/tileRoutes');
const calculationRoutes = require('./routes/calculationRoutes');
const calculationCostRoutes  = require('./routes/calculateCost');
const trafficRoutes=require('./routes/trafficRoutes');

const app = express();
connectDB();

// Enable CORS and allow requests from the frontend's origin
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());
app.use('/pzt/users', authRoutes);
app.use('/pzt/tiles', tileRoutes);
app.use('/pzt/calculate-tiles', calculationRoutes);
app.use('/pzt/cost',calculationCostRoutes);
app.use('/pzt/', trafficRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
