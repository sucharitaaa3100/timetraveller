import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

function Register() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registration successful! Please login.');
        navigate('/login');
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      alert('Error registering');
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="auth-box text-start" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-end mb-3">
          <button className="btn btn-sm btn-outline-light" onClick={() => setDarkMode(!darkMode)}>
            Switch to {darkMode ? 'Light' : 'Dark'} Theme
          </button>
        </div>
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" className="form-control" required value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Email address</label>
            <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

