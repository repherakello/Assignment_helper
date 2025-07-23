const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Please provide email and password'
      });
    }

    // 2) Check if admin exists and password is correct
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return res.status(401).json({
        success: false,
        error: 'Incorrect email or password'
      });
    }

    // 3) Update last login
    admin.lastLogin = Date.now();
    await admin.save();

    // 4) Create token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });

    // 5) Send response
    res.status(200).json({
      success: true,
      token,
      data: {
        admin: {
          id: admin._id,
          email: admin.email,
          role: admin.role
        }
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get current admin
exports.getMe = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      admin: req.admin
    }
  });
};