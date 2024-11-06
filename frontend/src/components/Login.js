import React, { useState } from 'react';
import api from '../pzt';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { jwtDecode } from 'jwt-decode'; // Corrected import

function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', { email, password });
      setMessage('Login successful');
      
      const token = response.data.token;
      setToken(token);
      localStorage.setItem('token', token);

      const decodedToken = jwtDecode(token); // Updated variable usage
      localStorage.setItem('userRole', decodedToken.role);

      navigate('/dashboard');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default Login;
