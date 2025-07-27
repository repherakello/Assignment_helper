import React from 'react';
import { Container, Row, Col, Card, Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faLaptopCode,
  faChartLine,
  faFlask,
  faBalanceScale,
  faUserGraduate,
  faSchool,
  faFileAlt,
  faPenFancy,
  faCalculator,
  faAtom,
  faMicroscope,
  faPills,
  faBuilding,
  faPercentage,
  faSquareRootAlt,
  faFlaskVial
} from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Services = () => {
  const serviceCategories = [
    {
      title: "Academic Writing",
      icon: faPenFancy,
      services: [
        "Assignments (All Subjects)",
        "Essays (All Types)",
        "Dissertations & Theses",
        "Research Papers",
        "Literature Reviews",
        "Case Studies"
      ]
    },
    {
      title: "Online Classes",
      icon: faUserGraduate,
      services: [
        "Full Course Support",
        "Weekly Tutoring Sessions",
        "Exam Preparation",
        "Homework Help",
        "Concept Clarification",
        "Make-up Classes"
      ]
    },
    {
      title: "Exams & Quizzes",
      icon: faFileAlt,
      services: [
        "Take My Online Exam",
        "Quiz Assistance",
        "Test Preparation",
        "Timed Assessments",
        "Proctored Exam Help",
        "Final Exam Support"
      ]
    },
    {
      title: "Computer Science",
      icon: faLaptopCode,
      services: [
        "Programming (JavaScript, Python, MATLAB)",
        "Web Development (HTML, CSS, React)",
        "Database Systems (SQL, NoSQL)",
        "Algorithms & Data Structures",
        "Artificial Intelligence",
        "Computer Networks"
      ]
    },
    {
      title: "Business & Finance",
      icon: faChartLine,
      services: [
        "Economics (Micro & Macro)",
        "Accounting (Financial, Managerial)",
        "Business Administration",
        "Finance (Corporate, Investments)",
        "Marketing",
        "Business Statistics"
      ]
    },
    {
      title: "Engineering",
      icon: faCalculator,
      services: [
        "Civil Engineering",
        "Mechanical Engineering",
        "Electrical Engineering",
        "Chemical Engineering",
        "Industrial Engineering",
        "Engineering Mathematics"
      ]
    },
    {
      title: "Medical Sciences",
      icon: faPills,
      services: [
        "Nursing",
        "Medicine",
        "Pharmacology",
        "Anatomy & Physiology",
        "Biochemistry",
        "Public Health"
      ]
    },
    {
      title: "Sciences",
      icon: faFlask,
      services: [
        "Biology (Molecular, Cellular)",
        "Chemistry (Organic, Physical)",
        "Physics (Classical, Quantum)",
        "Mathematics (All Levels)",
        "Statistics (SPSS, R Studio)",
        "Environmental Science"
      ]
    },
    {
      title: "Law & Social Sciences",
      icon: faBalanceScale,
      services: [
        "Law (All Specializations)",
        "Political Science",
        "Psychology",
        "Sociology",
        "Anthropology",
        "History"
      ]
    },
    {
      title: "High School Programs",
      icon: faSchool,
      services: [
        "Edgenuity Coursework",
        "Edmentum Assignments",
        "Penn Foster High School",
        "AP Classes",
        "Sophia Learning",
        "Florida Virtual School (FLVS)",
        "K12 Online School",
        "Ontario Virtual School (OVS)",
        "Acellus Academy",
        "IB Program"
      ]
    },
    {
      title: "Specialized Fields",
      icon: faBuilding,
      services: [
        "Architecture",
        "Actuarial Science",
        "Aviation",
        "Journalism",
        "Education",
        "Hospitality"
      ]
    }
  ];

  return (
    <Container className="py-5 services-page">
      <h1 className="text-center mb-5 section-title">
        Our Comprehensive Services
      </h1>
      
      <Row className="g-4">
        {serviceCategories.map((category, index) => (
          <Col key={index} md={6} lg={4}>
            <Card className="h-100 service-category-card">
              <Card.Header className="d-flex align-items-center">
                <FontAwesomeIcon icon={category.icon} size="2x" className="me-3" />
                <h3 className="mb-0">{category.title}</h3>
              </Card.Header>
              <Card.Body>
                <ul className="service-list">
                  {category.services.map((service, i) => (
                    <li key={i} className="d-flex align-items-center mb-2">
                      <FontAwesomeIcon icon={faBook} className="text-primary me-2" />
                      {service}
                    </li>
                  ))}
                </ul>
              </Card.Body>
              <Card.Footer className="text-center">
                <Button 
                  as={Link} 
                  to="/book" 
                  variant="primary" 
                  size="sm"
                  className="learn-more-btn"
                >
                  Learn More
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Services Section */}
      <div className="mt-5 pt-4">
        <h2 className="text-center mb-4 section-title">Specialized Support</h2>
        <Accordion defaultActiveKey="0" className="service-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <FontAwesomeIcon icon={faSquareRootAlt} className="me-2" />
              Mathematics & Physics
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                {[
                  "Calculus (I-IV)", 
                  "Linear Algebra",
                  "Differential Equations",
                  "Discrete Math",
                  "Number Theory",
                  "Classical Mechanics",
                  "Quantum Physics",
                  "Thermodynamics",
                  "Electromagnetism"
                ].map((item, i) => (
                  <Col md={6} key={i}>
                    <div className="d-flex align-items-center mb-2">
                      <FontAwesomeIcon icon={faPercentage} className="text-info me-2" />
                      {item}
                    </div>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
          
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <FontAwesomeIcon icon={faFlaskVial} className="me-2" />
              Life Sciences
            </Accordion.Header>
            <Accordion.Body>
              <Row>
                {[
                  "Genetics",
                  "Microbiology",
                  "Immunology",
                  "Neuroscience",
                  "Ecology",
                  "Zoology",
                  "Botany",
                  "Marine Biology",
                  "Bioinformatics"
                ].map((item, i) => (
                  <Col md={6} key={i}>
                    <div className="d-flex align-items-center mb-2">
                      <FontAwesomeIcon icon={faMicroscope} className="text-success me-2" />
                      {item}
                    </div>
                  </Col>
                ))}
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>

      {/* Main Booking CTA */}
      <div className="text-center mt-5">
        <Button 
          as={Link}
          to="/book"
          variant="primary"
          size="lg"
          className="px-5 main-booking-btn"
        >
          <FontAwesomeIcon icon={faUserGraduate} className="me-2" />
          Book Your Session Now
        </Button>
      </div>
    </Container>
  );
};

export default Services;