import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Booking from './components/Booking';
import Dashboard from './components/Dashboard';
import CustomNavbar from './components/Navbar';
import Services from './components/Services';
import SuccessStories from './components/SuccessStories';
import AdminLogin from './components/AdminLogin';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin/login" replace />;
};

// Admin Layout Component (optional - for admin-specific styling)
const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <CustomNavbar />
      <main className="main-content admin-content">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <>
            <CustomNavbar />
            <main className="main-content">
              <Home />
            </main>
          </>
        } />
        
        <Route path="/book" element={
          <>
            <CustomNavbar />
            <main className="main-content">
              <Booking />
            </main>
          </>
        } />
        
        <Route path="/services" element={
          <>
            <CustomNavbar />
            <main className="main-content">
              <Services />
            </main>
          </>
        } />
        
        <Route path="/success-stories" element={
          <>
            <CustomNavbar />
            <main className="main-content">
              <SuccessStories />
            </main>
          </>
        } />
        
        <Route path="/about" element={
          <>
            <CustomNavbar />
            <main className="main-content">
              <SuccessStories />
            </main>
          </>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={
          <div className="auth-layout">
            <AdminLogin />
          </div>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* Redirects */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;