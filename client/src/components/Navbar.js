import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faChartLine,
  faCheckCircle,
  faUserGraduate
} from "@fortawesome/free-solid-svg-icons";

const CustomNavbar = () => {
  // Services dropdown items
  const servicesDropdown = [
    { title: "All Assignments", description: "Any subject, any level" },
    { title: "Programming Help", description: "JavaScript, Python, MATLAB, etc" },
    { title: "Business & Finance", description: "Economics, Accounting, MBA" },
    { title: "Sciences", description: "Biology, Chemistry, Nursing" },
    { title: "Law & Humanities", description: "Dissertations, Essays" },
    { title: "Online Classes", description: "Full course support" }
  ];

  // Scroll to services function (for home page only)
  const scrollToServices = () => {
    if (window.location.pathname === '/') {
      const servicesSection = document.getElementById('services-section');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Assignment Helper
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="mx-2">
              Home
            </Nav.Link>
            
            <NavDropdown 
              title={
                <>
                  <FontAwesomeIcon icon={faBook} className="me-2" />
                  Our Services
                </>
              } 
              id="services-dropdown"
              className="mx-2"
            >
              {servicesDropdown.map((service, index) => (
                <NavDropdown.Item 
                  key={index}
                  as={Link}
                  to="/book"
                  className="py-2"
                >
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon 
                      icon={faCheckCircle} 
                      className="text-primary me-2" 
                    />
                    <div>
                      <h6 className="mb-0">{service.title}</h6>
                      <small className="text-muted">{service.description}</small>
                    </div>
                  </div>
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Nav.Link 
              as={Link}
              to={window.location.pathname === '/' ? '#services-section' : '/#services-section'}
              className="mx-2"
              onClick={scrollToServices}
            >
              <FontAwesomeIcon icon={faChartLine} className="me-2" />
              Dashboard
            </Nav.Link>

            <Button 
              as={Link}
              to="/book" 
              variant="primary" 
              className="ms-3 px-4"
            >
              Book Session
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;