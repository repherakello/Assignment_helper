import React from "react";
import "./legal.css";

const HonorCode = () => {
  return (
    <div className="legal-container">
      <h1>Honor Code</h1>
      <p><strong>Effective Date:</strong> February 10, 2025</p>
      
      <h2>Academic Integrity</h2>
      <p>
        <strong>Honesty:</strong> Submit only your own work or credit all external sources properly.<br />
        <strong>Originality:</strong> Assignments must be your own or authorized content.<br />
        <strong>Responsibility:</strong> Ensure compliance with academic standards.
      </p>

      <h2>Purpose of Use</h2>
      <p>
        Our services are intended to:
        <ul>
          <li>Help you understand complex topics.</li>
          <li>Serve as guidance for your own work.</li>
        </ul>
      </p>

      <h2>Prohibited Actions</h2>
      <p>
        <ul>
          <li>Submitting someone else's work as your own.</li>
          <li>Plagiarism or cheating.</li>
          <li>Misrepresenting content to academic authorities.</li>
        </ul>
      </p>

      <p>
        Contact us at <a href="mailto:assignhelper@gmail.com">assignhelper@gmail.com</a> for violations.
      </p>
    </div>
  );
};

export default HonorCode;