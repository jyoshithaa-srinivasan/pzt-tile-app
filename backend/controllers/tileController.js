// backend/controllers/tileController.js
const Tile = require('../models/Tile');

exports.getTiles = async (req, res) => {
    try {
        const tiles = await Tile.find().select('size powerCapacity cost installationCostPerSqm');
        res.json(tiles);
    } catch (error) {
        console.error("error fetching tiles",error);
        res.status(500).json({ error: error.message ,message:"Failed to fetch tiles"});
    }
};
