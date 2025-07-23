const express = require('express');
const { protect } = require('../middleware/auth');
const {
  getAllBookings,
  updateBookingStatus,
  deleteBooking
} = require('../controllers/bookings');

const router = express.Router();

router.use(protect);

router.get('/', getAllBookings);
router.patch('/:id', updateBookingStatus);
router.delete('/:id', deleteBooking);

module.exports = router;