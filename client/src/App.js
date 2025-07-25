import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Main components
import Home from './components/Home';
import Booking from './components/Booking';
import Dashboard from './components/Dashboard';
import CustomNavbar from './components/Navbar';
import Services from './components/Services';
import SuccessStories from './components/SuccessStories';
import AdminLogin from './components/AdminLogin';
import Footer from './components/Footer';

// Legal components
import PrivacyPolicy from './components/legal/PrivacyPolicy';
import TermsConditions from './components/legal/TermsConditions';
import HonorCode from './components/legal/HonorCode';
import CookiePolicy from './components/legal/CookiePolicy';
import ServicePolicy from './components/legal/ServicePolicy';
import Copyright from './components/legal/Copyright';

// Layout components
import ScrollToTop from './components/layout/ScrollToTop';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/admin/login" replace />;
};

// Layout Components
const PublicLayout = ({ children }) => (
  <>
    <CustomNavbar />
    <main className="main-content">
      {children}
    </main>
    <Footer />
  </>
);

const AdminLayout = ({ children }) => (
  <div className="admin-layout">
    <CustomNavbar />
    <main className="main-content admin-content">
      {children}
    </main>
  </div>
);

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    {children}
  </div>
);

function App() {
  // Nuclear option for scroll reset (additional protection)
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/book" element={<PublicLayout><Booking /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/success-stories" element={<PublicLayout><SuccessStories /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><SuccessStories /></PublicLayout>} />

          {/* Legal Routes */}
          <Route path="/privacy" element={<PublicLayout><PrivacyPolicy /></PublicLayout>} />
          <Route path="/terms" element={<PublicLayout><TermsConditions /></PublicLayout>} />
          <Route path="/honor-code" element={<PublicLayout><HonorCode /></PublicLayout>} />
          <Route path="/cookie-policy" element={<PublicLayout><CookiePolicy /></PublicLayout>} />
          <Route path="/service-policy" element={<PublicLayout><ServicePolicy /></PublicLayout>} />
          <Route path="/copyright" element={<PublicLayout><Copyright /></PublicLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AuthLayout><AdminLogin /></AuthLayout>} />
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
      </ScrollToTop>
    </Router>
  );
}

export default App;