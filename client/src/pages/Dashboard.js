import React from 'react';
import Navbar from '../components/Navbar';
import './Dashboard.css';

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <h2 className="mb-3">Welcome, Time Traveller 👋</h2>
          <p>
            Explore the past like never before. Use the tabs above to:
          </p>
          <ul>
            <li>📅 Search for historical events by date</li>
            <li>🌤 Discover what the weather was like</li>
            <li>📝 Take notes and save interesting facts</li>
            <li>💾 Keep your favorite discoveries</li>
          </ul>
          <p className="mt-4"><em>Crafted with ancient style. Explore your timeline!</em></p>
        </div>
      </div>
    </>
  );
}

export default Dashboard;



