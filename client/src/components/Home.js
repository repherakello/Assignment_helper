import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="my-5 py-5">
      <Row className="align-items-center">
        <Col md={6}>
          <h1 className="display-4">Get Expert Help with Your Assignments</h1>
          <p className="lead my-4">
            Book one-on-one sessions with experienced tutors to help you understand and complete your assignments successfully.
          </p>
          <Button variant="primary" size="lg" href="/book">
            Book a Session Now
          </Button>
        </Col>
        <Col md={6}>
          <img 
            src="https://via.placeholder.com/600x400?text=Assignment+Helper" 
            alt="Tutor helping student" 
            className="img-fluid rounded shadow"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;