import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import BrowserRouter as Router
import './Header.css';

const logo = require('./logo.png');

const Header = () => {
  return (
    <Router> {/* Wrap your entire component inside Router */}
      <header>
        <div className="logo">
          <img src={logo.default} alt="" />
          <nav>
            <ul className="horizontal-list">
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/products">Products</Link></li>
            </ul>
          </nav>
        </div>
      </header>
    </Router>
  );
};

export default Header;
