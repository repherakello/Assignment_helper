import React from 'react';
import './legal.css';

const TermsConditions = () => {
  return (
    <div className="legal-container">
      <h1>Terms and Conditions</h1>
      <p><strong>Effective Date:</strong> July 26, 2025</p>
      
      <h2>1. Service Agreement</h2>
      <p>
        By using Assignment Helper, you agree to:
        <ul>
          <li>Provide accurate information for assignments</li>
          <li>Use completed work as a <strong>reference only</strong></li>
          <li>Not redistribute our content without permission</li>
        </ul>
      </p>

      <h2>2. Payments & Refunds</h2>
      <p>
        Payments are non-refundable once work begins. 
        Refunds may be issued for undelivered services (at our discretion).
      </p>
    </div>
  );
};

export default TermsConditions;