import React, { useEffect, useState } from 'react';
import '../styles/SellItemPage.css';
import Navbar from '../components/navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellItemPage = () => {
  const [userId, setUserId] = useState(null);

  const [itemDetails, setItemDetails] = useState<any>({
    name: '',
    currentBid: '',
    endTime: '',
    auctionType: 'dutch',
    sellerId: userId
  });

  const [image, setImage] = useState<any>(null);
  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setItemDetails({ ...itemDetails, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageDataUrl = reader.result as string;
        const blob = dataURLtoBlob(imageDataUrl);
        setImage(blob);
      };
      reader.readAsDataURL(file);
    }
  };

  const dataURLtoBlob = (dataURL: string) => {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const blob = new Blob([raw], { type: contentType });
    return blob;
  };


  useEffect(() => {
    const sessionId = window.localStorage.getItem('sessionId');
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/userId?sessionId=${sessionId}`);
        setUserId(response.data);
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();

    setItemDetails({ ...itemDetails, sellerId: userId });
  }, [userId]);

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
      const formattedDate = itemDetails.endTime.replace('T', ' ').slice(0, 16);
      const updatedItemDetails = { ...itemDetails, endTime: formattedDate };
      setItemDetails(updatedItemDetails);
      const firstResponse = await axios.post('http://localhost:8080/api/catalogue/product/sell', updatedItemDetails);
      console.log('First response:', firstResponse.data);


      const sendImage = async () => {
        try {
          const formData = new FormData();
          formData.append('id', firstResponse.data.msg);
          formData.append('image', image);
          console.log(formData)
          console.log(image)
          // const secondResponse = await axios.post('http://localhost:8080/api/catalogue/product/sell/adv', formData);
          // console.log('Second response:', secondResponse.data);


        } catch (error) {
          console.error('Error listing item:', error);
        }
      }

      if (image){
        sendImage();
      }
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
