import React from 'react';
import '../styles/Payment.css'; 
import Header from './Header';
//import { Link, useLocation } from 'react-router-dom'
//<!-- <Link to="/Receipt" className='submit'>SUBMIT</Link> -->   


const Payment = () => {

  return (
    <div className="App">
      <div className='contents'>
      <div className="left">
      <h1>Winning Bidder</h1>
        <div className='Winning-bidder'>
          <p>First Name: XXX</p>
          <p>Last Name: XXX</p>
          <p>Street: XXX</p>
          <p>Number: XXX</p>
          <p>Province: XXX</p>
          <p>Country: XXX</p>
          <p>Postal Code: XXX</p>
          <p>Total Cost: XXX</p>
        </div>
      </div>
      <hr /> {/* Horizontal line */}
      <div className="right">
        <div className='Credit'>
          <h1>Card Details</h1>
          <p>Card Number</p>
          <input></input>
          <p>Name on Card</p>
          <input></input>
          <p>Expiry Date</p>
          <input></input>
          <p>Security Code</p>
          <input></input>
          </div>
      </div>
      </div>
    </div>
  );
}

export default Payment;
