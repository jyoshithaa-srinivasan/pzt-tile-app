import React, { useState } from 'react';
import pzt from '../pzt';
import '../App.css';

function FootTrafficUpload() {
    const [area, setArea] = useState('');
    const [date, setDate] = useState('');
    const [footTraffic, setFootTraffic] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await pzt.post('http://localhost:3000/pzt/foot_traffic', {
                area,
                date,
                footTraffic: parseInt(footTraffic)
            });
            setResponseMessage(response.data.message);
        } catch (error) {
            console.error('Error uploading foot traffic data:', error);
            setResponseMessage('Failed to upload foot traffic data');
        }
    };

    return (
        <div className="foot-traffic-upload">
            <h2>Upload Foot Traffic Data</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Area:</label>
                    <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Foot Traffic Count:</label>
                    <input
                        type="number"
                        value={footTraffic}
                        onChange={(e) => setFootTraffic(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}

export default FootTrafficUpload;
