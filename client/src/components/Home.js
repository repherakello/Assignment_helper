import React from 'react';
import { 
  Container, Row, Col, Button, Card, Badge, Carousel
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  faUserGraduate, faCheckCircle, faUsers, faClock, 
  faAward, faSyncAlt, faShieldAlt, faBook,
  faLaptopCode, faChartLine, faFlask, faBalanceScale
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';

const Home = () => {
  // Data for services
  const services = [
    { icon: faBook, title: "Assignments", category: "All Subjects" },
    { icon: faLaptopCode, title: "Programming Help", category: "JavaScript, Python, MATLAB" },
    { icon: faChartLine, title: "Business & Finance", category: "Economics, Accounting" },
    { icon: faFlask, title: "Sciences", category: "Biology, Chemistry, Nursing" },
    { icon: faBalanceScale, title: "Law & Humanities", category: "Dissertations, Essays" },
    { icon: faUserGraduate, title: "Online Classes", category: "Full Course Support" }
  ];

  // Data for stats
  const stats = [
    { value: "5,000+", label: "Students Helped", icon: faUsers },
    { value: "98%", label: "Satisfaction Rate", icon: faAward },
    { value: "24/7", label: "Support Available", icon: faClock },
    { value: "100+", label: "Subject Experts", icon: faUserGraduate }
  ];

  // Data for guarantees
  const guarantees = [
    { icon: faClock, title: "Timely Delivery", description: "Never miss a deadline" },
    { icon: faAward, title: "Quality Work", description: "Top grades guaranteed" },
    { icon: faSyncAlt, title: "Free Revisions", description: "Until you're satisfied" },
    { icon: faShieldAlt, title: "Plagiarism-Free", description: "With verification reports" }
  ];

  // Data for carousel items
  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1470&q=80",
      title: "Assignment Helper - Your Academic Success Partner",
      text: "Trusted by thousands of students worldwide for expert help in all subjects.",
      buttons: [
        { variant: "primary", text: "Get Started Now", link: "/book" },
        { variant: "outline-light", text: "About Us", link: "/about" },
        { variant: "outline-light", text: "Contact Us", link: "https://wa.me/254742391394" }
      ]
    },
    {
      image: "",
      title: "Achieve More with Professional Assistance",
      text: "Experience quality and timely support for all your academic needs.",
      buttons: [
        { variant: "primary", text: "Get Started Now", link: "/book" },
        { variant: "outline-light", text: "Our Services", link: "/services" },
        { variant: "outline-light", text: "WhatsApp Us", link: "https://wa.me/254742391394" }
      ]
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero-banner">
        <Carousel controls={false} indicators interval={5000} pause={false}>
          {carouselItems.map((item, index) => (
            <Carousel.Item key={index}>
              <div 
                className="carousel-slide" 
                style={{ backgroundImage: `url('${item.image}')` }}
              >
                <div className="carousel-overlay"></div>
                <Container className="h-100 d-flex align-items-center">
                  <Row>
                    <Col lg={7} className="carousel-content">
                      <h1 className="display-4 fw-bold mb-4">
                        {item.title}
                      </h1>
                      <p className="lead mb-4">{item.text}</p>
                      <div className="d-flex flex-wrap gap-3">
                        {item.buttons.map((button, btnIndex) => (
                          <Button
                            key={btnIndex}
                            variant={button.variant}
                            size="lg"
                            href={button.link}
                            target={button.link.includes('wa.me') ? "_blank" : "_self"}
                          >
                            {button.text}
                          </Button>
                        ))}
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-5 services-section">
        <Container>
          <h2 className="text-center mb-5 section-title">
            <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
            Our Comprehensive Services
          </h2>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col key={index} md={4}>
                <Link to="/book" className="service-link">
                  <Card className="h-100 service-card">
                    <Card.Body className="text-center p-4">
                      <FontAwesomeIcon 
                        icon={service.icon} 
                        size="3x" 
                        className="mb-3 service-icon" 
                      />
                      <Card.Title className="mb-2">{service.title}</Card.Title>
                      <Badge bg="info" className="service-badge">{service.category}</Badge>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Guarantees Section */}
      <section className="py-5 guarantees-section">
        <Container>
          <h2 className="text-center mb-5 section-title">Our Guarantees</h2>
          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="guarantee-grid">
                {guarantees.map((guarantee, index) => (
                  <div key={index} className="guarantee-item">
                    <FontAwesomeIcon 
                      icon={guarantee.icon} 
                      size="3x" 
                      className="mb-3 guarantee-icon" 
                    />
                    <h4>{guarantee.title}</h4>
                    <p>{guarantee.description}</p>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Us Section */}
      <section className="py-5 about-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="order-lg-1 order-2">
              <div className="about-image p-4">
                <img 
                  src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=1470&q=80" 
                  alt="Our team" 
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </Col>
            <Col lg={6} className="order-lg-2 order-1 mb-4 mb-lg-0">
              <h2 className="section-title mb-4">Why Choose Us?</h2>
              
              <div className="achievement-item mb-4">
                <h4>
                  <FontAwesomeIcon icon={faAward} className="text-primary me-2" />
                  98% Success Rate
                </h4>
                <p>Consistently high grades delivered to thousands of students worldwide</p>
              </div>

              <div className="achievement-item mb-4">
                <h4>
                  <FontAwesomeIcon icon={faUsers} className="text-primary me-2" />
                  Student Testimonials
                </h4>
                <blockquote className="blockquote ps-3 border-start border-primary">
                  <p>"They helped me score 95% on my nursing dissertation when I was struggling. Lifesavers!"</p>
                  <footer className="blockquote-footer">Sarah, Medical Student</footer>
                </blockquote>
                <blockquote className="blockquote ps-3 border-start border-primary mt-3">
                  <p>"The programming help I received was worth every penny. Finished my project 3 days early!"</p>
                  <footer className="blockquote-footer">James, CS Major</footer>
                </blockquote>
              </div>

              {/* Corrected Button Link */}
              <Button 
                as={Link} 
                to="/success-stories"  // Changed from "/about" to "/success-stories"
                variant="primary" 
                size="lg" 
                className="mt-3"
              >
                Read More Success Stories
              </Button>

            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 stats-section">
        <Container>
          <Row className="g-4">
            {stats.map((stat, index) => (
              <Col key={index} md={3} className="text-center">
                <div className="stat-item">
                  <FontAwesomeIcon icon={stat.icon} size="3x" className="mb-3 stat-icon" />
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Fixed Book Session Button */}
      <div className="fixed-book-button">
        <Button 
          as={Link}
          to="/book" 
          variant="primary" 
          size="lg"
          className="shadow-lg"
        >
          <FontAwesomeIcon icon={faUserGraduate} className="me-2" />
          Book Session Now
        </Button>
      </div>
    </div>
  );
};

export default Home;