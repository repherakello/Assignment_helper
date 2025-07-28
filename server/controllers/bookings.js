const Booking = require('../models/Booking');
const APIFeatures = require('../utils/apiFeatures');
const fs = require('fs');
const path = require('path');

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
      deadline,
      ticketNumber
    } = req.body;

    // Validate required fields
    if (!ticketNumber || !ticketNumber.startsWith('TKT-')) {
      return res.status(400).json({
        status: 'fail',
        message: 'Valid ticket number is required'
      });
    }

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
      ticketNumber,
      status: 'pending'
    };

    // Handle file upload if exists (optional)
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