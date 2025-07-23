import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Table, Button, Alert, 
  Spinner, Form, Badge, InputGroup, FormControl 
} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSync, faTrash, faEdit, faCheck, 
  faTimes, faSearch, faFilter
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: statusFilter === 'all' ? undefined : statusFilter }
      });
      setBookings(data.data.bookings);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:5000/api/bookings/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchBookings(); // Refresh data
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const filteredBookings = bookings.filter(booking =>
    `${booking.firstName} ${booking.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <Container className="text-center mt-5">
      <Spinner animation="border" />
      <p className="mt-2">Loading bookings...</p>
    </Container>
  );

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        <FontAwesomeIcon icon={faFilter} className="me-2" />
        Booking Management
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Search and Filter Bar */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              placeholder="Search by name or subject..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
        
        <Col md={3}>
          <Form.Select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </Form.Select>
        </Col>

        <Col md={3} className="text-end">
          <Button variant="primary" onClick={fetchBookings}>
            <FontAwesomeIcon icon={faSync} className="me-2" />
            Refresh
          </Button>
        </Col>
      </Row>

      {/* Bookings Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Contact</th>
              <th>Service</th>
              <th>Education</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <tr key={booking._id}>
                  <td>
                    <strong>{booking.firstName} {booking.lastName}</strong>
                    <div className="text-muted small">{booking.subject}</div>
                  </td>
                  <td>
                    <div>{booking.email}</div>
                    <div className="text-primary">{booking.phone}</div>
                  </td>
                  <td>{booking.serviceType}</td>
                  <td>{booking.educationLevel}</td>
                  <td>
                    <Badge 
                      bg={
                        booking.status === 'completed' ? 'success' :
                        booking.status === 'rejected' ? 'danger' :
                        booking.status === 'in-progress' ? 'warning' : 'secondary'
                      }
                      className="text-capitalize"
                    >
                      {booking.status}
                    </Badge>
                  </td>
                  <td>
                    <Button 
                      variant="outline-success" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleStatusUpdate(booking._id, 'completed')}
                    >
                      <FontAwesomeIcon icon={faCheck} /> Complete
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                    >
                      <FontAwesomeIcon icon={faTimes} /> Reject
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  {bookings.length === 0 ? 'No bookings found' : 'No matching bookings found'}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default Dashboard;