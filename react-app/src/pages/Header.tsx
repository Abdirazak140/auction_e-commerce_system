import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import Dashboard from './dashboard';
import "../images/auctionlogo.png"

const Header = () => {
  return (
    <header className="website-name">
      Auction Site
      <nav>
        <ul>
          <li><Link to="/login">Login</Link></li> {/* Add a link to the Login page */}
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/products">Products</Link></li> {/* Updated link */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

  