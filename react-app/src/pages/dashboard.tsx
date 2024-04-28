import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import '../styles/dashboard.css'; // Choose the correct import statement based on your project structure

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div style={{ position: 'absolute', top: '17vh', left: '14vb', color: '#2e2b2b', fontSize: '2vb', fontFamily: 'Lato, sans-serif', fontWeight: '600' }}>Auction Information</div>
      <div style={{ position: 'absolute', top: '57vh', left: '14vb', color: '#2e2b2b', fontSize: '2vb', fontFamily: 'Lato, sans-serif', fontWeight: '600' }}>Important Information</div>
      <Link to="/sell-item" className="square" style={{ top: '20vh', left: '13vb', position: 'absolute', backgroundColor: '#78beeb' }}>Start An Auction</Link>
      <Link to="/products" className="square" style={{ top: '20vh', left: '73vb', position: 'absolute', backgroundColor: '#43b3e0' }}>Current Auctions</Link>
      <Link to="/auction-history" className="square" style={{ top: '20vh', left: '133vb', position: 'absolute', backgroundColor: '#8aa7bf' }}>Auction History</Link>
      <Link to="/payment-status" className="square" style={{ top: '60vh', left: '13vb', position: 'absolute', backgroundColor: '#f77e94' }}>Payment Status</Link>
      <Link to="/information" className="square" style={{ top: '60vh', left: '73vb', position: 'absolute', backgroundColor: '#bf43a0' }}>Information</Link>
      <Link to="/support-and-help" className="square" style={{ top: '60vh', left: '133vb', position: 'absolute', backgroundColor: '#c89dff' }}>Support and Help</Link>
    </div>
  );
};

export default Dashboard;
