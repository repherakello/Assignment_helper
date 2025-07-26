const Booking = require('../models/Booking');
const APIFeatures = require('../utils/apiFeatures');
const fs = require('fs');
const path = require('path');

// Helper function to generate ticket number
const generateTicketNumber = () => {
  return 'TKT-' + Math.random().toString(36).substr(2, 8).toUpperCase();
};

// CREATE a new booking
exports.createBooking = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      serviceType,
      educationLevel,
      subject,
      details,
      deadline
    } = req.body;

    // Validate deadline
    if (new Date(deadline) <= new Date()) {
      return res.status(400).json({
        status: 'fail',
        message: 'Deadline must be in the future'
      });
    }

    const bookingData = {
      firstName,
      lastName,
      phone,
      email,
      serviceType,
      educationLevel,
      subject,
      details,
      deadline,
      ticketNumber: generateTicketNumber()
    };

    // Handle file upload if exists
    if (req.file) {
      bookingData.fileUrl = `/uploads/${req.file.filename}`;
    }

    const booking = await Booking.create(bookingData);

    res.status(201).json({
      status: 'success',
      data: {
        booking
      }
    });

  } catch (err) {
    // Remove uploaded file if error occurred
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// GET all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const features = new APIFeatures(Booking.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    
    const bookings = await features.query;

    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// UPDATE booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        booking
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

// DELETE a booking
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({
        status: 'fail',
        message: 'No booking found with that ID'
      });
    }

    // Delete associated file if exists
    if (booking.fileUrl) {
      const filePath = path.join(__dirname, '../../uploads', booking.fileUrl.split('/uploads/')[1]);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};