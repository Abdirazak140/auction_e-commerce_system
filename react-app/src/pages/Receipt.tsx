import React from 'react';
import './Receipt.css';
import Header from './Header';

const Receipt = () => {
  return (
    <div className="App">
      <div className='contents'>
      <div className="left">
      <h1>Receipt</h1>
        <div className='Receipt'>
          <p>First Name: XXX</p>
          <p>Last Name: XXX</p>
          <p>Street: XXX</p>
          <p>Number: XXX</p>
          <p>Province: XXX</p>
          <p>Country: XXX</p>
          <p>Postal Code: XXX</p>
          <p>Total Paid: XXX</p>
          <p>Item ID: XXX</p>
        </div>
      </div>
      <hr /> {/* Horizontal line */}
      <div className="right">
        <div className='Shipping-Details'>
          <h1>Shipping Details</h1>
          <div className='contents-right'>
          <p>THE ITEM WILL BE SHIPPED IN XXX DAYS</p>
          <button>BACK TO MAIN PAGE</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Receipt;
