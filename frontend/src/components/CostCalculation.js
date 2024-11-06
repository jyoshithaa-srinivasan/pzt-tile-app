import React, { useState, useEffect } from 'react';
import pzt from '../pzt'; 
import '../App.css';


function CostCalculation() {
    const [tiles, setTiles] = useState([]);
    const [selectedTileId, setSelectedTileId] = useState('');
    const [area, setArea] = useState('');
    const [costResult, setCostResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch tiles on component mount
    useEffect(() => {
        const fetchTiles = async () => {
            try {
                const response = await pzt.get('/tiles');
                setTiles(response.data);
            } catch (err) {
                console.error('Failed to fetch tiles:', err);
            }
        };
        fetchTiles();
    }, []);

    const calculateCost = async () => {
        if (!selectedTileId || !area) {
            setError('Please select a tile and enter the area.');
            return;
        }
        setError('');
        setLoading(true);

        try {
            const response = await pzt.get(`/pzt/cost/${selectedTileId}?area=${area}`);
            setCostResult(response.data);
        } catch (err) {
            console.error('Cost calculation failed:', err);
            setError('Failed to calculate cost. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cost-calculation">
            <h2>Calculate Installation Cost</h2>
            {loading && <p>Loading...</p>}
            
            <select onChange={(e) => setSelectedTileId(e.target.value)} value={selectedTileId}>
                <option value="">Select a Tile</option>
                {tiles.map((tile) => (
                    <option key={tile._id} value={tile._id}>
                        {`Size: ${tile.size} sqm, Capacity: ${tile.powerCapacity} W/footstep, Cost: $${tile.cost}, installationCostPerSqm:$${tile.installationCostPerSqm}`}
                    </option>
                ))}
            </select>

            <input
                type="number"
                placeholder="Area in sqm"
                value={area}
                onChange={(e) => setArea(e.target.value)}
            />

            <button onClick={calculateCost}>Calculate Cost</button>
            {error && <p className="error">{error}</p>}
            
            {costResult && (
                <div className="results">
                    <h3>Cost Estimation</h3>
                    <p>Total Cost: ${costResult.totalCost}</p>
                    {costResult.installationCost && <p>Installation Cost: ${costResult.installationCost}</p>}
                </div>
            )}
        </div>
    );
}

export default CostCalculation;
