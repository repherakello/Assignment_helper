const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    minlength: [2, 'First name must be at least 2 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    minlength: [2, 'Last name must be at least 2 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10,15}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  serviceType: {
    type: String,
    required: [true, 'Service type is required'],
    enum: {
      values: [
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
      ],
      message: '{VALUE} is not a valid service type'
    }
  },
  educationLevel: {
    type: String,
    required: [true, 'Education level is required'],
    enum: {
      values: [
        "High School",
        "Undergraduate",
        "Graduate",
        "PhD",
        "Professional Certification"
      ],
      message: '{VALUE} is not a valid education level'
    }
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [2, 'Subject must be at least 2 characters']
  },
  details: {
    type: String,
    required: [true, 'Details are required'],
    trim: true,
    minlength: [10, 'Details must be at least 10 characters']
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