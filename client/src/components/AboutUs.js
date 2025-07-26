import React, { useState } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  Accordion,
  Image 
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faAward, 
  faGraduationCap,
  faGlobe,
  faUserTie
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const AboutUs = () => {
  const [activeKey, setActiveKey] = useState(null);

  const toggleAccordion = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div className="about-us-page">
      {/* Hero Banner */}
      <section className="hero-banner about-hero">
        <Container className="h-100 d-flex align-items-center">
          <Row>
            <Col lg={8} className="mx-auto text-center">
              <h1 className="display-4 fw-bold text-white">About Assignment Helper</h1>
              <p className="lead text-white">Trusted academic support since 2017</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="section-title mb-4">Our Journey</h2>
              <p className="lead">
                Founded in 2017 to support university students, we expanded during the pandemic to help high school diploma seekers.
              </p>
              <p>
                Today, we've empowered <strong>27,000+ students</strong> across all academic levels, including <strong>19,000+ graduates</strong> and postgraduates worldwide.
              </p>
              
              <div className="achievement-box p-4 mt-4">
                <FontAwesomeIcon icon={faUserTie} size="2x" className="me-3 text-primary" />
                <div>
                  <h4>Our Founder</h4>
                  <p>
                    A Computer Science graduate with expertise in AI and Machine Learning, passionate about creating accessible academic support for students at all levels.
                  </p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Image 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80" 
                alt="Our team" 
                fluid
                rounded
                className="shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 stats-section">
        <Container>
          <h2 className="text-center mb-5 section-title">By The Numbers</h2>
          <Row className="g-4">
            <Col md={3} className="text-center">
              <Card className="stat-item h-100">
                <Card.Body>
                  <FontAwesomeIcon icon={faGraduationCap} size="3x" className="mb-3 stat-icon" />
                  <h3 className="stat-value">27k+</h3>
                  <p className="stat-label">Students Helped</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="text-center">
              <Card className="stat-item h-100">
                <Card.Body>
                  <FontAwesomeIcon icon={faUsers} size="3x" className="mb-3 stat-icon" />
                  <h3 className="stat-value">19k+</h3>
                  <p className="stat-label">Postgraduates</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="text-center">
              <Card className="stat-item h-100">
                <Card.Body>
                  <FontAwesomeIcon icon={faAward} size="3x" className="mb-3 stat-icon" />
                  <h3 className="stat-value">98%</h3>
                  <p className="stat-label">Success Rate</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} className="text-center">
              <Card className="stat-item h-100">
                <Card.Body>
                  <FontAwesomeIcon icon={faGlobe} size="3x" className="mb-3 stat-icon" />
                  <h3 className="stat-value">50+</h3>
                  <p className="stat-label">Countries</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 section-title">Frequently Asked Questions</h2>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion activeKey={activeKey} onSelect={toggleAccordion}>
                {/* FAQ Items remain unchanged from previous version */}
                {/* ... */}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default AboutUs;