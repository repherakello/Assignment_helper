import React from 'react';
import './legal.css';

const HonorCode = () => {
  return (
    <div className="legal-container">
      <h1>Code Of Conduct</h1>
      <p><strong>Effective Date:</strong> February 10, 2025</p>
      
      <h2>Academic Integrity</h2>
      <p>
        <strong>Honesty:</strong> Submit only your own work or credit all external sources properly.<br />
        <strong>Originality:</strong> Assignments must be your own or authorized content.<br />
        <strong>Responsibility:</strong> Ensure compliance with academic standards.<br/>
        <strong>Collaboration:</strong> Work with tutors for guidance, not to complete assignments for you.<br/>
        <strong>Respect:</strong> Treat all users and staff with respect and professionalism.
      </p>

      <h2>Purpose of Use</h2>
      <p>
        Our services are intended to:
        <ul>
          <li>Help you understand complex topics</li>
          <li>Serve as guidance for your own work</li>
            <li>Provide resources for learning</li>
            <li>Assist with exam preparation</li>
            <li>Support your academic journey</li>
        </ul>
      </p>
        <h2>Prohibited Activities</h2>
        <p>
        Engaging in the following activities is strictly prohibited:
            <li>Plagiarism or submitting work that is not your own</li>
          <li>Submitting our work as your own</li>
            <li>Using our services for any form of academic dishonesty</li>
            <li>Sharing your account credentials with others</li>
            <li>Attempting to gain unauthorized access to our systems</li>
        </p>
    </div>
  );
};

export default HonorCode;