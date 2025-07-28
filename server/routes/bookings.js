const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');
const upload = require('../utils/multerConfig');
const { protect, restrictTo } = require('../middleware/auth');

// Anyone can create a booking
router.post('/', 
  upload.single('assignmentFile'), 
  bookingController.createBooking
);

// Admin-only routes
router.get('/', 
  protect, 
  restrictTo('admin', 'superadmin'), 
  bookingController.getAllBookings
);
router.patch('/:id', 
  protect, 
  restrictTo('admin', 'superadmin'), 
  bookingController.updateBookingStatus
);
router.delete('/:id', 
  protect, 
  restrictTo('admin', 'superadmin'), 
  bookingController.deleteBooking
);

module.exports = router;