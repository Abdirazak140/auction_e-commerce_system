import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';
import ProductTable from './products'

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/producttable" element={<ProductTable/>}/>
        </Routes>
    </Router>
  );
}

export default App;
