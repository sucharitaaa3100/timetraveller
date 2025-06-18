import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

function Login() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      alert('Error logging in');
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
        <h2 className="mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email address</label>
            <input type="email" className="form-control" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" required value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

