import React, { useState } from 'react';
import './UpdateDutchAuctionPrice.css'; // Import the CSS file

export default function UpdateDutchAuctionPrice() {
  const [priceUpdate, setPriceUpdate] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceUpdate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Price update details have been captured.');
  };

  return (
    <div className="update-dutch-auction-price-container"> {/* Added a container class */}
      <h2 className="update-price-heading">Update Dutch Auction Price</h2>
      <form onSubmit={handleSubmit} className="update-price-form"> {/* Added form class */}
        <input type="text" name="priceUpdate" placeholder="New Price" value={priceUpdate} onChange={handleChange} className="input-field" />
        <button type="submit" className="update-price-button">Update Price</button> {/* Added button class */}
      </form>
    </div>
  );
}
