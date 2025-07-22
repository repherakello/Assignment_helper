require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your React app's address
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

// Mock database
let bookings = [];

// Booking endpoint with error handling
app.post('/api/bookings', (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.subject) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newBooking = {
      ...req.body,
      id: Date.now(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    console.log('New booking saved:', newBooking);
    res.status(201).json(newBooking);
    
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});