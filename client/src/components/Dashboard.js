import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Table, Button, Alert, 
  Spinner, Form, Badge, InputGroup, FormControl 
} from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSync, faTrash, faEdit, faCheck, 
  faTimes, faSearch, faFilter, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    rejected: 0
  });

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/bookings', {
        headers: { Authorization: `Bearer ${token}` },
        params: { status: statusFilter === 'all' ? undefined : statusFilter }
      });
      setBookings(data.data.bookings);
      calculateStats(data.data.bookings);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (bookings) => {
    setStats({
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      rejected: bookings.filter(b => b.status === 'rejected').length
    });
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
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const viewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const filteredBookings = bookings.filter(booking =>
    `${booking.firstName} ${booking.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase())
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

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <div className="stat-card bg-primary text-white p-3 rounded">
            <h5>Total Bookings</h5>
            <h2>{stats.total}</h2>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card bg-warning text-dark p-3 rounded">
            <h5>Pending</h5>
            <h2>{stats.pending}</h2>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card bg-success text-white p-3 rounded">
            <h5>Completed</h5>
            <h2>{stats.completed}</h2>
          </div>
        </Col>
        <Col md={3}>
          <div className="stat-card bg-danger text-white p-3 rounded">
            <h5>Rejected</h5>
            <h2>{stats.rejected}</h2>
          </div>
        </Col>
      </Row>

      {/* Search and Filter Bar */}
      <Row className="mb-4 g-3">
        <Col md={6}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <FormControl
              placeholder="Search by name, subject or service..."
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
                      variant="outline-info" 
                      size="sm" 
                      className="me-2"
                      onClick={() => viewDetails(booking)}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} /> Details
                    </Button>
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

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="modal-backdrop">
          <div className="modal-content p-4 bg-white rounded shadow">
            <div className="d-flex justify-content-between mb-3">
              <h4>Booking Details</h4>
              <Button variant="outline-secondary" onClick={() => setShowDetailsModal(false)}>
                Close
              </Button>
            </div>
            
            <div className="mb-3">
              <h5>{selectedBooking.firstName} {selectedBooking.lastName}</h5>
              <p className="text-muted">{selectedBooking.email}</p>
              <p><strong>Phone:</strong> {selectedBooking.phone}</p>
            </div>
            
            <div className="mb-3">
              <p><strong>Service:</strong> {selectedBooking.serviceType}</p>
              <p><strong>Education Level:</strong> {selectedBooking.educationLevel}</p>
              <p><strong>Subject:</strong> {selectedBooking.subject}</p>
              <p><strong>Status:</strong> 
                <Badge 
                  bg={
                    selectedBooking.status === 'completed' ? 'success' :
                    selectedBooking.status === 'rejected' ? 'danger' :
                    selectedBooking.status === 'in-progress' ? 'warning' : 'secondary'
                  }
                  className="ms-2 text-capitalize"
                >
                  {selectedBooking.status}
                </Badge>
              </p>
            </div>
            
            <div className="mb-3">
              <h6>Assignment Details:</h6>
              <p>{selectedBooking.details}</p>
            </div>
            
            <div className="d-flex gap-2">
              <Button 
                variant="success" 
                onClick={() => {
                  handleStatusUpdate(selectedBooking._id, 'completed');
                  setShowDetailsModal(false);
                }}
              >
                <FontAwesomeIcon icon={faCheck} className="me-2" />
                Mark as Completed
              </Button>
              <Button 
                variant="danger"
                onClick={() => {
                  handleStatusUpdate(selectedBooking._id, 'rejected');
                  setShowDetailsModal(false);
                }}
              >
                <FontAwesomeIcon icon={faTimes} className="me-2" />
                Reject Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Dashboard;