const FootTraffic = require('../models/FootTraffic'); // Assuming you have a FootTraffic model

exports.uploadFootTraffic = async (req, res) => {
    const { area, date, footTraffic } = req.body;

    try {
        // Create a new record in the FootTraffic collection
        const trafficData = new FootTraffic({
            area,
            date,
            footTraffic
        });

        await trafficData.save();

        res.status(201).json({
            message: 'Foot traffic data uploaded successfully',
            data: trafficData
        });
    } catch (error) {
        console.error('Error uploading foot traffic data:', error);
        res.status(500).json({ error: 'Failed to upload foot traffic data' });
    }
};
