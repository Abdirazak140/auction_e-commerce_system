import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import './dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Header />
      <div className="list-container">
        <ul className="dashboard-list">
          <li>Information</li>
          <li>Current Auctions</li>
          <li>Auction History</li>
          <li>Payment Status</li>
          <li>Notifications</li>
          <li>Auction Settings</li>
          <li>Support and Help</li>
          <li>Other Features</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
