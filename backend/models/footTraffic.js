const mongoose = require('mongoose');

const footTrafficSchema = new mongoose.Schema({
    area: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    footTraffic: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('FootTraffic', footTrafficSchema);
