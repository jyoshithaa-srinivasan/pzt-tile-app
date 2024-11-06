// backend/controllers/calculationController.js
const Tile = require('../models/Tile');

exports.calculateTiles = async (req, res) => {
    const { length, width, footTraffic } = req.body;
    try {
        const area = length * width;
        const tile = await Tile.findOne();
        const numTiles = Math.ceil(area / tile.size);
        const energyGeneration = footTraffic * tile.powerCapacity;
        res.json({ totalArea: area, numTiles, estimatedEnergy: energyGeneration, dailyEnergy: energyGeneration,monthlyEnergy: energyGeneration * 30 });
    } catch (error) {
        console.error('Error in tile calculation:', error);
        res.status(500).json({ error: error.message });
    }
};
