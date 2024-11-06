// backend/models/Tile.js
const mongoose = require('mongoose');

const tileSchema = new mongoose.Schema({
    size: { type: Number, required: true }, // Size in square meters
    powerCapacity: { type: Number, required: true }, // Watts per footstep
    cost: { type: Number, required: true }, // Cost per tile
    installationCostPerSqm:{type:Number,required:true}
});

module.exports = mongoose.model('Tile', tileSchema);
