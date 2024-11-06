// frontend/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
    const [token, setToken] = useState(localStorage.getItem('token'));

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <div>
                {!token ? (
                    <>

                      <div class="navigator">
                      <h1>PZT Tile Selection App</h1>

                      <div class="nav-wrapper">
                      <nav class="nav-container">
                            <Link to="/login">Login</Link>  
                        </nav>
                        <nav class="nav-container">
                        <Link to="/register">Register</Link>
                        </nav>

                      </div>

                      

                      </div>
                        
                        <Routes>
                            <Route path="/register" element={<Register />} />
                            <Route path="/login" element={<Login setToken={setToken} />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    </>
                ) : (
                    <>
                        <button onClick={logout}>Logout</button>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
