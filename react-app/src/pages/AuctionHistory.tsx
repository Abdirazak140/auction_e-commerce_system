import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Products.css'; 
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Product {
  id: number;
  name: string;
  winningBid: number;
  auctionType: string;
  date: string;
}

const AuctionHistory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get<Product[]>('http://localhost:8080/product')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSelectButtonClick = (productId: number) => {
    // Handle button click, e.g., add selected product to a list
    console.log('Product selected:', productId);
  };

  const handleSearch = () => {
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  return (
    <>
      <Header />
      <div className='main'>
        <div className="product-table-container">
          <h1>Product Catalogue</h1>
          <div className="search-container">
            <div style={{left: '24%', top: "50px", position: "absolute"}}>
            <button onClick={handleSearch} className="search-icon-button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
            </div>
            <input
              type="text"
              placeholder="Search by item name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        <table className="product-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Current Price</th>
            <th>Auction Type</th>
            <th>Winning Bid</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.winningBid}</td>
              <td>{product.auctionType}</td>
              <td>{product.date}</td>
              <td>
                <button onClick={() => handleSelectButtonClick(product.id)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default AuctionHistory;
