import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css'; // Import CSS file for styling
import Header from './Header';

interface Product {
  id: number;
  name: string;
  currentPrice: number;
  auctionType: string;
  remainingTime: string;
}

const ProductTable: React.FC = () => {
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
    <div className='main'>
    <div className="product-table-container">
      <h1>Product Catalogue </h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by item name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Current Price</th>
            <th>Auction Type</th>
            <th>Remaining Time</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.currentPrice}</td>
              <td>{product.auctionType}</td>
              <td>{product.remainingTime}</td>
              <td>
                <button onClick={() => handleSelectButtonClick(product.id)}>Select</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ProductTable;
