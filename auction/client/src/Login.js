import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      if (response.data.message === 'Login successful!') {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userId', response.data.userId); // Store userId in local storage
        onLogin(response.data.username);
        navigate('/'); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Error during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <br />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <br />
      <br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;