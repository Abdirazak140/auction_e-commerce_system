import React, { useState } from 'react';
import './SellItemPage.css'; // Import the CSS file

const SellItemPage = () => {
  const [itemDetails, setItemDetails] = useState({
    description: '',
    auctionType: '',
    duration: '',
    startingBid: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Item details have been captured.');
  };

  return (
    <div className="sell-item-container"> {/* Added a container class */}
      <h2>List an Item for Auction</h2>
      <form onSubmit={handleSubmit} className="sell-item-form"> {/* Added form class */}
        <input type="text" name="description" placeholder="Item Description" onChange={handleChange} className="input-field" />
        <select name="auctionType" onChange={handleChange} className="select-field"> {/* Removed unnecessary type cast */}
          <option value="">Select Auction Type</option>
          <option value="dutch">Dutch</option>
          <option value="forward">Forward</option>
        </select>
        <input type="text" name="duration" placeholder="Duration (in hours)" onChange={handleChange} className="input-field" />
        <input type="text" name="startingBid" placeholder="Starting Bid" onChange={handleChange} className="input-field" />
        <button type="submit" className="submit-button">List Item</button> {/* Added a button class */}
      </form>
    </div>
  );
}

export default SellItemPage;
