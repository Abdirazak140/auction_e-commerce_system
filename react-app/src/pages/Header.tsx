import React from 'react';
import './Header.css';
const logo = require('./logo.png');

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo.default} alt="" />
      </div>
    </header>
  );
};

export default Header;
