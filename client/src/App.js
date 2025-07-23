import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Booking from './components/Booking';
import Dashboard from './components/Dashboard';
import CustomNavbar from './components/Navbar';
import SuccessStories from './components/SuccessStories';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/about" element={<SuccessStories />} /> // If you want /about to show success stories
        </Routes>
      </main>
    </Router>
  );
}

export default App;