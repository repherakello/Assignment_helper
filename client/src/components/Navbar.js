import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { faCalendarAlt, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">Assignment_helper</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/book">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              Book Session
            </Nav.Link>
            <Nav.Link as={Link} to="/dashboard">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Dashboard
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;