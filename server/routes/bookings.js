// routes/bookings.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

// Create a new booking
router.post('/', bookingController.createBooking); // You’ll add this method next

// Get all bookings
router.get('/', bookingController.getAllBookings);

// Update booking status
router.patch('/:id', bookingController.updateBookingStatus); // 👈 this must exist

// Delete booking
router.delete('/:id', bookingController.deleteBooking); // optional

module.exports = router;
