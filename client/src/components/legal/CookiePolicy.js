import React from 'react';
import './legal.css';

const CookiePolicy = () => {
  return (
    <div className="legal-container">
      <h1>Cookie Policy</h1>
      <p><strong>Effective Date:</strong> February, 2025</p>
      
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small files stored on your device to enhance site functionality.
        They help us remember your preferences, improve site performance, and provide a better user experience.
        You can control cookie settings through your browser, but disabling cookies may affect site functionality.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        <ul>
          <li><strong>Essential:</strong> Login sessions and payment processing</li>
          <li><strong>Analytics:</strong> Google Analytics to improve our site</li>
            <li><strong>Marketing:</strong> To personalize your experience and show relevant ads</li>
            <li><strong>Functionality:</strong> Remembering your preferences and settings</li>
            <li><strong>Third-Party:</strong> Services like Google and Facebook for social media integration</li>
        </ul>
      </p>
    </div>
  );
};

export default CookiePolicy;