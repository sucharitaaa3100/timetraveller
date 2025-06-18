import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';

function Navbar() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/dashboard">
        ⏳ Time Traveller
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        onClick={toggleNavbar}
        aria-controls="navbarNav"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse justify-content-center ${isOpen ? 'show' : ''}`} id="navbarNav">
        <ul className="navbar-nav d-flex gap-4">
          <li className="nav-item">
            <Link className="nav-link" to="/history" onClick={() => setIsOpen(false)}>History</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/weather" onClick={() => setIsOpen(false)}>Weather</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/saved" onClick={() => setIsOpen(false)}>Saved</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notes" onClick={() => setIsOpen(false)}>Notes</Link>
          </li>
        </ul>
      </div>

      <div className="d-flex align-items-center gap-2 ms-auto">
        <button className="btn btn-sm btn-outline-light" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light' : 'Dark'} Mode
        </button>
        <button className="btn btn-sm btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;


