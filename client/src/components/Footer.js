import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Assignment Helper</h5>
            <p className="text-muted">Your academic success partner</p>
          </Col>
          <Col md={4}>
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/privacy" className="text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-white">Terms & Conditions</Link></li>
              <li><Link to="/honor-code" className="text-white">Honor Code</Link></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="mailto:assignhelper@gmail.com" className="text-white">Email Us</a></li>
              <li><a href="https://tiktok.com/@assignment_helper001" target="_blank" rel="noopener noreferrer" className="text-white">TikTok</a></li>
              <li><a href="https://instagram.com/do_my_assignments_helper" target="_blank" rel="noopener noreferrer" className="text-white">Instagram</a></li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <p className="text-center text-muted mb-0">
          © {new Date().getFullYear()} Assignment Helper. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer; // This is the crucial line