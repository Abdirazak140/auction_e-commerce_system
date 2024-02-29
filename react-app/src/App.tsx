import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from './pages/login';
import Singup from './pages/signup';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Singup/>}/>
        </Routes>
    </Router>
  );
}

export default App;
