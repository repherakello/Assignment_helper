import React from "react";
import "./legal.css";

const CookiePolicy = () => {
  return (
    <div className="legal-container">
      <h1>Cookie Policy</h1>
      <p><strong>Effective Date:</strong> July 26, 2025</p>
      
      <h2>1. What Are Cookies?</h2>
      <p>
        Cookies are small files stored on your device to enhance site functionality.
      </p>

      <h2>2. How We Use Cookies</h2>
      <p>
        <ul>
          <li><strong>Essential:</strong> Login sessions and payment processing.</li>
          <li><strong>Analytics:</strong> Google Analytics to improve our site.</li>
        </ul>
      </p>

      <h2>3. Managing Cookies</h2>
      <p>
        Disable cookies via your browser settings, but this may limit site features.
      </p>
    </div>
  );
};

export default CookiePolicy;