import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';

import './theme.css';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Weather from './pages/Weather';
import SavedPosts from './pages/SavedPosts';
import Notes from './pages/Notes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/saved" element={<SavedPosts />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

