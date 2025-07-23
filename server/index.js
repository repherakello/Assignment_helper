require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Enhanced CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection with Enhanced Options
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assignment_helper';

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Connection Events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Define Booking Schema with Validation
const bookingSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  subject: { 
    type: String, 
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  date: { 
    type: Date, 
    required: [true, 'Date is required'],
    min: [new Date(), 'Date must be in the future']
  },
  duration: { 
    type: Number, 
    required: [true, 'Duration is required'],
    min: [30, 'Minimum duration is 30 minutes'],
    max: [240, 'Maximum duration is 240 minutes']
  },
  details: { 
    type: String, 
    trim: true,
    maxlength: [1000, 'Details cannot exceed 1000 characters']
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create Booking Model
const Booking = mongoose.model('Booking', bookingSchema);

// API Routes

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date(),
    uptime: process.uptime()
  });
});

// Test Endpoint
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Server is working!',
    version: process.env.npm_package_version,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Create Booking Endpoint
app.post('/api/bookings', async (req, res) => {
  try {
    console.log('Incoming booking data:', req.body);
    
    // Manual validation in addition to schema validation
    const { name, email, subject, date, duration, details } = req.body;
    
    if (!name || !email || !subject || !date || !duration) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields',
        required: ['name', 'email', 'subject', 'date', 'duration']
      });
    }

    const newBooking = new Booking({
      name,
      email,
      subject,
      date: new Date(date),
      duration: Number(duration),
      details: details || ''
    });

    const savedBooking = await newBooking.save();
    
    console.log('Booking saved successfully:', savedBooking);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      bookingId: savedBooking._id,
      booking: savedBooking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    
    // Handle different error types
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    if (error.name === 'MongoError' && error.code === 11000) {
      return res.status(409).json({ 
        success: false,
        error: 'Duplicate booking detected'
      });
    }
    
    res.status(500).json({ 
      success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get All Bookings Endpoint
app.get('/api/bookings', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    res.json({
      success: true,
      count: bookings.length,
      bookings
    });
    
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch bookings'
    });
  }
});

// 404 Handler for Undefined Routes
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    error: 'Endpoint not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Server Configuration
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});