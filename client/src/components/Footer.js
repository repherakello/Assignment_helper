import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaEnvelope, 
  FaTiktok, 
  FaInstagram,
  FaHome,
  FaBalanceScale,
  FaShieldAlt,
  FaGraduationCap
} from 'react-icons/fa';
import './Footer.css'; // Create this file

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Row>
          <Col md={4} className="footer-brand">
            <h5>
              <FaGraduationCap className="footer-icon" />
              Assignment Helper
            </h5>
            <p className="text-muted">Your academic success partner</p>
          </Col>
          
          <Col md={4} className="footer-links">
            <h5>Legal</h5>
            <ul className="footer-nav">
              <li>
                <Link to="/privacy">
                  <FaShieldAlt className="footer-icon" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms">
                  <FaBalanceScale className="footer-icon" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/honor-code">
                  <FaGraduationCap className="footer-icon" />
                  Honor Code
                </Link>
              </li>
            </ul>
          </Col>
          
          <Col md={4} className="footer-contact">
            <h5>Contact</h5>
            <ul className="footer-nav">
              <li>
                <a href="mailto:assignhelper@gmail.com">
                  <FaEnvelope className="footer-icon" />
                  assignhelper@gmail.com
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@assignment_helper001" target="_blank" rel="noopener noreferrer">
                  <FaTiktok className="footer-icon" />
                  @assignment_helper001
                </a>
              </li>
              <li>
                <a href="https://instagram.com/do_my_assignments_helper" target="_blank" rel="noopener noreferrer">
                  <FaInstagram className="footer-icon" />
                  @do_my_assignments_helper
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <Row>
          <Col className="text-center footer-bottom">
            <hr className="footer-divider" />
            <p className="copyright">
              © {new Date().getFullYear()} Assignment Helper. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;