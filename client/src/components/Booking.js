import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { faCalendarAlt, faClock, faBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Booking = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    duration: '60',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Prepare the booking data
      const bookingData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        date: startDate.toISOString(),
        duration: Number(formData.duration),
        details: formData.details.trim()
      };

      console.log('Submitting booking:', bookingData);

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();
      console.log('Server response:', result);

      if (!response.ok) {
        throw new Error(result.error || result.message || 'Booking failed');
      }

      // Successful submission
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        duration: '60',
        details: ''
      });
      setStartDate(new Date());
      

    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message || 'Failed to submit booking. Please check your information and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="my-5 py-4">
      <h2 className="text-center mb-4">
        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
        Book a Tutoring Session
      </h2>
      
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{error}</p>
          {error.includes('Validation') && (
            <p className="mb-0">Please check all fields and try again.</p>
          )}
        </Alert>
      )}
      
      {submitted ? (
        <Alert variant="success" className="text-center">
          <h4>Booking Submitted Successfully!</h4>
          <p>Your session request has been received.</p>
          <p>We'll send a confirmation email shortly.</p>
          <Button 
            variant="outline-primary" 
            onClick={() => setSubmitted(false)}
            className="mt-3"
          >
            Book Another Session
          </Button>
        </Alert>
      ) : (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-light">
              <Form.Group className="mb-3">
                <Form.Label>Full Name *</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  minLength="2"
                  maxLength="100"
                  placeholder="John Doe"
                />
                <Form.Text className="text-muted">
                  Minimum 2 characters
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address *</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="your@email.com"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faBook} className="me-2" />
                  Subject/Assignment Topic *
                </Form.Label>
                <Form.Control 
                  type="text" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  required 
                  minLength="3"
                  maxLength="200"
                  placeholder="e.g., Calculus, Essay Writing"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                  Session Date and Time *
                </Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  minDate={new Date()}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  className="form-control"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faClock} className="me-2" />
                  Session Duration *
                </Form.Label>
                <Form.Select 
                  name="duration" 
                  value={formData.duration}
                  onChange={handleChange}
                  required
                >
                  <option value="30">30 minutes ($25)</option>
                  <option value="60">60 minutes ($45)</option>
                  <option value="90">90 minutes ($65)</option>
                  <option value="120">120 minutes ($85)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Additional Details</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="details" 
                  value={formData.details}
                  onChange={handleChange}
                  maxLength="1000"
                  placeholder="Describe what help you need, specific questions, etc."
                />
                <Form.Text className="text-muted">
                  Maximum 1000 characters
                </Form.Text>
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 mt-3"
                disabled={isLoading || submitted}
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
                    Processing...
                  </>
                ) : (
                  'Confirm Booking Request'
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Booking;