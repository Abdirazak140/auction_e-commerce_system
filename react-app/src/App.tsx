import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import ForwardAuctionBidPage from './pages/ForwardAuctionPage';
import DutchAuctionBidPage from './pages/DutchAuctionPage';
import AuctionEndPage from './pages/AuctionEndingPage'; // Import the AuctionEndPage
import SellItemPage from './pages/SellItemPage';
import UpdateDutchAuctionPrice from './pages/UpdateDutchAuctionPage';
import Receipt from './pages/receipt';
import Payment from './pages/payment';
import AuctionHistory from './pages/AuctionHistory';
import Home from './pages/home';
import Search from './pages/search';
import Catalogue from './pages/catalogue';

function App() {
  return (
    <Router>
        <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/item-search" element={<Search />} />
          <Route path="/item-search/:item" element={<Catalogue/>} />
          <Route path="/payment/:id/:price" element={<Payment />} /> 
          <Route path="/receipt/:id/:price" element={<Receipt />} /> 
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/forward-auction-bid/:id" element={<ForwardAuctionBidPage />} />
          <Route path="/dutch-auction-bid/:id" element={<DutchAuctionBidPage />} />
          <Route path="/sell-item" element={<SellItemPage />} /> 
          <Route path="/auction-end/:id/:price" element={<AuctionEndPage />} /> 
          
          <Route path="/update-dutch-auction-price" element={<UpdateDutchAuctionPrice />} /> 
          <Route path="/auction-history" element={<AuctionHistory />} /> 
        </Routes>
    </Router>
  );
}

export default App;
