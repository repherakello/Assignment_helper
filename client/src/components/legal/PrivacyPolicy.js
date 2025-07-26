import React from 'react';
import './legal.css';

const PrivacyPolicy = () => {
  return (
    <div className="legal-container">
      <h1>Privacy Policy</h1>
      <p><strong>Effective Date:</strong> July 26, 2025</p>
      
      <h2>1. Information We Collect</h2>
      <p>
        We collect personal data such as name, email, and payment details when you use Assignment Helper. 
        This data is used solely to provide our services and improve user experience.
      </p>

      <h2>2. How We Use Your Data</h2>
      <p>
        Your data is used for:
        <ul>
          <li>Processing assignments and payments</li>
          <li>Communicating service updates</li>
          <li>Complying with legal obligations</li>
        </ul>
      </p>

      <h2>3. Data Protection</h2>
      <p>
        We implement SSL encryption and restrict access to your data. 
        We <strong>do not sell</strong> your information to third parties.
      </p>
    </div>
  );
};

export default PrivacyPolicy;