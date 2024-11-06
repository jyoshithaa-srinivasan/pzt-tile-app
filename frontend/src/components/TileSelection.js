import React, { useState, useEffect } from 'react';
import api from '../pzt';
import '../App.css';

function TileSelection() {
    const [tiles, setTiles] = useState([]);
    const [selectedTileId, setSelectedTileId] = useState('');
    const [area, setArea] = useState({ length: '', width: '' });
    const [footTraffic, setFootTraffic] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTiles = async () => {
            setLoading(true);
            try {
                const response = await api.get('/tiles');
                setTiles(response.data);
            } catch (error) {
                console.error('Failed to fetch tiles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTiles();
    }, []);

    const calculateTiles = async () => {
        if (!selectedTileId || !area.length || !area.width || !footTraffic) {
            setMessage('Please fill all fields before calculating');
            return;
        }
        setMessage('');
        setLoading(true);
        try {
            const response = await api.post('/calculate-tiles', {
                length: area.length,
                width: area.width,
                footTraffic
            });
            setResult(response.data);
        } catch (error) {
            console.error('Calculation failed:', error);
            setMessage('Calculation failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tile-selection">
            <h2>Select Tile and Calculate</h2>
            {loading && <p>Loading...</p>}
            <select onChange={(e) => setSelectedTileId(e.target.value)} value={selectedTileId}>
                <option value="">Select a Tile</option>
                {tiles.map((tile) => (
                    <option key={tile._id} value={tile._id}>
                        {`Size: ${tile.size} sqm, Capacity: ${tile.powerCapacity} W/footstep, Cost: $${tile.cost}`}
                    </option>
                ))}
            </select>

            <h3>Input Area Dimensions</h3>
            <input
                type="number"
                placeholder="Length (m)"
                value={area.length}
                onChange={(e) => setArea({ ...area, length: e.target.value })}
            />
            <input
                type="number"
                placeholder="Width (m)"
                value={area.width}
                onChange={(e) => setArea({ ...area, width: e.target.value })}
            />

            <h3>Estimated Foot Traffic</h3>
            <input
                type="number"
                placeholder="Foot Traffic"
                value={footTraffic}
                onChange={(e) => setFootTraffic(e.target.value)}
            />

            <button onClick={calculateTiles}>Calculate</button>
            {message && <p className="error">{message}</p>}

            {result && (
                <div className="results">
                    <h3>Results</h3>
                    <p>Total Area: {result.totalArea} sqm</p>
                    <p>Number of Tiles: {result.numTiles}</p>
                    <p>Estimated Energy Generation: {result.estimatedEnergy} watts/day</p>
                    <p>Daily Energy Estimation: {result.dailyEnergy} watts/day</p>
                    <p>Monthly Energy:{result.monthlyEnergy} watts</p>
                </div>
            )}

        </div>
    );
}

export default TileSelection;
