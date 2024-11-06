// backend/controllers/costController.js
const Tile = require('../models/Tile');

exports.calculateCost = async (req, res) => {
    const { tile_id } = req.params;
    const { area } = req.query;

    try {
        const tile = await Tile.findById(tile_id);

        if (!tile) {
            return res.status(404).json({ error: 'Tile not found' });
        }

        const numTiles = Math.ceil(area / tile.size);
        const tileCost = numTiles * tile.cost;
        const installationCost = area * (tile.installationCostPerSqm || 0);
        const totalCost = tileCost + installationCost;

        res.json({
            area: area,
            numTiles: numTiles,
            tileCost: tileCost,
            installationCost: installationCost,
            totalCost: totalCost,
        });
    } catch (error) {
        console.error('Error calculating cost:', error);
        res.status(500).json({ error: 'Failed to calculate cost' });
    }
};
