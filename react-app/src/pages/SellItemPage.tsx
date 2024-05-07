import React, { useEffect, useState } from 'react';
import '../styles/SellItemPage.css';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellItemPage = () => {
  const [itemDetails, setItemDetails] = useState<any>({
    name: '',
    currentBid: '',
    endTime: '',
    auctionType: 'dutch'
  });

  const [image, setImage] = useState<any>(null);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchAuthState = async () => {
      const sessionId = window.localStorage.getItem('sessionId');

      if (sessionId) {
        try {
          const response = await axios.post(`http://localhost:8080/api/users/getAuthState?sessionId=${sessionId}`);

          if (response.data === false) {
            navigate(`/login`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchAuthState();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const firstResponse = await axios.post('http://localhost:8080/api/catalogue/product/sell', itemDetails);
      console.log('First response:', firstResponse.data);

      const formData = new FormData();
      formData.append('id', firstResponse.data.id); 
      formData.append('image', image);

      const secondResponse = await axios.post('http://localhost:8080/api/catalogue/product/sell/adv', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Second response:', secondResponse.data);
    } catch (error) {
      console.error('Error listing item:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="outer-container" style={{ marginTop: '5vh' }}>
        <div className="sell-item-container">
          <h2>List an Item for Auction</h2>
          <form onSubmit={handleSubmit} className="sell-item-form">
            <input type="text" name="name" placeholder="Item Name" onChange={handleChange} className="input-field" />
            <input type="number" name="currentBid" placeholder="Current Bid" onChange={handleChange} className="input-field" />
            <input type="datetime-local" name="endTime" onChange={handleChange} className="input-field" />
            <select name="auctionType" onChange={handleChange} className="select-field">
              <option value="dutch">Dutch</option>
              <option value="forward">Forward</option>
            </select>
            <input type="file" name="image" onChange={handleImageChange} className="input-field" />
            <div>
              <button type="submit" className="w-full cursor-pointer bg-purple-600 text-white py-4 px-4 rounded-md hover:bg-purple-700 transition duration-300">List Item</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SellItemPage;
