import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faBook, faUserGraduate, faSchool, faPhone, faCalendarAlt, faPaperclip, faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Booking = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    serviceType: '',
    educationLevel: '',
    subject: '',
    details: ''
  });
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  const serviceTypes = [
    "Full Class Assistance",
    "Essay Writing",
    "Dissertation Help",
    "Assignment Help",
    "Exam Preparation",
    "Online Tutoring",
    "Programming Help",
    "Thesis Writing",
    "Research Paper",
    "Case Study Analysis"
  ];

  const educationLevels = [
    "High School",
    "Undergraduate",
    "Graduate",
    "PhD",
    "Professional Certification"
  ];

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const generateTicketNumber = () => {
    return 'TKT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const generatedTicket = generateTicketNumber();
      setTicketNumber(generatedTicket);
      
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName.trim());
      formDataToSend.append('lastName', formData.lastName.trim());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('serviceType', formData.serviceType);
      formDataToSend.append('educationLevel', formData.educationLevel);
      formDataToSend.append('subject', formData.subject.trim());
      formDataToSend.append('details', formData.details.trim());
      formDataToSend.append('deadline', deadline);
      formDataToSend.append('ticketNumber', generatedTicket);
      formDataToSend.append('status', 'pending');
      
      if (file) {
        formDataToSend.append('assignmentFile', file);
      }

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit booking');
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message || 'Failed to submit booking. Please check your information and try again.');
      setTicketNumber('');
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = (phone) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanedPhone}`, '_blank');
  };

  return (
    <Container className="my-5 py-4">
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faBook} className="me-2" />
        Request Academic Assistance
      </h2>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
        </Alert>
      )}
      
      {submitted ? (
        <Alert variant="success" className="text-center">
          <h4>Request Submitted Successfully!</h4>
          <p>We've received your request and will contact you shortly.</p>
          <div className="ticket-notification mb-3">
            <FontAwesomeIcon icon={faTicketAlt} className="me-2" />
            Your ticket number: <strong>{ticketNumber}</strong>
          </div>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <Button 
              as={Link}
              to="/"
              variant="primary"
            >
              Return to Home
            </Button>
            <Button 
              variant="outline-primary" 
              onClick={() => {
                setSubmitted(false);
                setTicketNumber('');
              }}
            >
              Submit Another Request
            </Button>
          </div>
        </Alert>
      ) : (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>First Name *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      required 
                      minLength="2"
                      placeholder="John"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Last Name *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      required 
                      minLength="2"
                      placeholder="Doe"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faPhone} className="me-2" />
                  WhatsApp Number *
                </Form.Label>
                <Form.Control 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                  placeholder="e.g., 254706158956"
                  pattern="[0-9]{10,15}"
                />
                <Form.Text className="text-muted">
                  We'll contact you via WhatsApp
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  Deadline for Completion *
                </Form.Label>
                <Form.Control 
                  type="date" 
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faPaperclip} className="me-2" />
                  Upload Assignment File
                </Form.Label>
                <Form.Control 
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                />
                <Form.Text className="text-muted">
                  Upload your assignment instructions or materials (optional)
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faBook} className="me-2" />
                  Service Needed *
                </Form.Label>
                <Form.Select 
                  name="serviceType" 
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a service</option>
                  {serviceTypes.map((service, index) => (
                    <option key={index} value={service}>{service}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faUserGraduate} className="me-2" />
                  Education Level *
                </Form.Label>
                <Form.Select 
                  name="educationLevel" 
                  value={formData.educationLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your level</option>
                  {educationLevels.map((level, index) => (
                    <option key={index} value={level}>{level}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faSchool} className="me-2" />
                  Subject/Course *
                </Form.Label>
                <Form.Control 
                  type="text" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  placeholder="e.g., Calculus, Business Management"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Assignment Details *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  name="details" 
                  value={formData.details}
                  onChange={handleChange}
                  required
                  placeholder="Please describe what you need help with, including any specific requirements, deadlines, etc."
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </Button>

                {formData.phone && (
                  <Button 
                    variant="success" 
                    size="lg"
                    onClick={() => openWhatsApp(formData.phone)}
                    className="mt-2"
                  >
                    <FontAwesomeIcon icon={faPhone} className="me-2" />
                    Chat on WhatsApp Now
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Booking;