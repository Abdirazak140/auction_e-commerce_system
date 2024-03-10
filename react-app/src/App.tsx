import React, { useState } from 'react';
import './Payment.css';
import Header from './Header';
import { Link, useLocation } from 'react-router-dom'
import Payment from './Payment';
import Receipt from './Receipt';
import ItemSearch from './itemSearch';
import ProductTable from './products'


const App = () => {

  return (
    <div className="App">
    <ProductTable />


    </div>
  );
}

export default App;
