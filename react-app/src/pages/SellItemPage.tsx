import React, { useState } from 'react';
import '../styles/SellItemPage.css'; // Import the CSS file
import Header from '../components/Header'; // Import the header component


type ItemDetails = {
  description: string;
  auctionType: string;
  duration: string;
  startingBid: string;
  image: File | null; // Allow image to be File or null
};



const SellItemPage = () => {
  const [itemDetails, setItemDetails] = useState<ItemDetails>({
    description: '',
    auctionType: '',
    duration: '',
    startingBid: '',
    image: null 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setItemDetails({ ...itemDetails, image: e.target.files[0] }); // Update the state with the selected file
    }
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Item details have been captured.');
  };


  return (
    <>
    <Header/>
    <div className="outer-container" style={{ marginTop: '5vh' }}> {/* This div has been added to control the top margin */}
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
        <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="input-field" // You might want to create a specific class for file inputs
          />
          <div style={{left: '64%', top: '87%', position: "absolute"}}>
        <button type="submit" className="submit-button">List Item</button> {/* Added a button class */}
        </div>
      </form>
    </div>
    </div>
    </>
  );
}

export default SellItemPage;
