import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import Dashboard from './dashboard';
import logo from "../images/auctionlogo.png"

const Header = () => {
  return (
      <header className="website-name">
          <img className='auctionImg' src={logo} alt="Auction Logo" /> Auction Site 
        <nav>
          <ul>
          <li><Link className="nav-link" to="/login">Login</Link></li>
          <li><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
          <li><Link className="nav-link" to="/products">Products</Link></li>
          </ul>
        </nav>
      </header>
    );
};
  
export default Header;