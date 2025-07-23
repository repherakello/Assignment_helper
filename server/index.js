// Remove the Booking model and routes from here
// Keep only the core setup:

require('dotenv').config({ debug: true });  // Add this line

console.log('🔍 Current Working Directory:', process.cwd());
console.log('🔍 .env location:', __dirname + '/.env');
console.log('🔍 Raw env vars:', {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET ? 'exists' : 'missing'
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initializeAdmin } = require('./models/Admin');

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200 // limit each IP to 200 requests per windowMs
});
app.use(limiter);

// Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});


// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/bookings', require('./routes/bookings'));

// Health Check (keep your existing endpoint)

// Error Handling (keep your existing handlers)

// Initialize first admin
mongoose.connection.once('open', () => {
  initializeAdmin();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));