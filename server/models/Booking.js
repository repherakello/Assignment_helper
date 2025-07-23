const mongoose = require('mongoose');
const validator = require('validator');

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^[0-9]{10,15}$/.test(v);
      },
      message: 'Please enter a valid phone number'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: [
      'Full Class Assistance',
      'Essay Writing',
      'Dissertation Help',
      // Add all other service types from your frontend
    ]
  },
  educationLevel: {
    type: String,
    required: [true, 'Education level is required'],
    enum: [
      'High School',
      'Undergraduate',
      'Graduate',
      'PhD',
      'Professional Certification'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    maxlength: [100, 'Subject cannot exceed 100 characters']
  },
  details: {
    type: String,
    required: [true, 'Details are required'],
    maxlength: [2000, 'Details cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', bookingSchema);