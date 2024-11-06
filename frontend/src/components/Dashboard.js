import React, { useState, useEffect } from 'react';
import TileSelection from './TileSelection';
import TrafficDataUpload from './FootTrafficDataUpload';
import CostCalculation from './CostCalculation';
import '../App.css';

function Dashboard() {
    const [view, setView] = useState('tileSelection');
    const [userRole, setUserRole] = useState(null);

    // Retrieve user role from localStorage on component mount
    useEffect(() => {
        const role = localStorage.getItem('userRole');
        setUserRole(role);
    }, []);

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="dashboard-buttons">
                <button onClick={() => setView('tileSelection')} className={view === 'tileSelection' ? 'active' : ''}>
                    Tile Selection
                </button>

                {/* Conditionally render the Traffic Data Upload button for admins only */}
                {userRole === 'admin' && (
                    <button onClick={() => setView('trafficData')} className={view === 'trafficData' ? 'active' : ''}>
                        Traffic Data Upload
                    </button>
                )}

                <button onClick={() => setView('costCalculation')} className={view === 'costCalculation' ? 'active' : ''}>
                    Budget and ROI Calculation
                </button>
            </div>

            <div className="dashboard-content">
                {view === 'tileSelection' && <TileSelection />}
                {view === 'trafficData' && <TrafficDataUpload />}
                {view === 'costCalculation' && <CostCalculation />}
            </div>
        </div>
    );
}

export default Dashboard;
