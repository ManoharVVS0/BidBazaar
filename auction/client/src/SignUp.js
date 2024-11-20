// SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, mobile }),
      });
      const data = await response.json();
      if (response.ok) {
        onSignUp(username);
        navigate('/'); // Redirect to homepage after signup
      } else {
        alert(data.message || 'Sign up failed');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />
      <br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        required
      />
      <br />
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
