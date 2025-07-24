const Booking = require('../models/Booking');
const APIFeatures = require('../utils/apiFeatures');

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
      details
    } = req.body;

    const booking = await Booking.create({
      firstName,
      lastName,
      phone,
      email,
      serviceType,
      educationLevel,
      subject,
      details
    });

    res.status(201).json({
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
    await Booking.findByIdAndDelete(req.params.id);
    
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
