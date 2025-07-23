const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  },
  lastLogin: Date,
  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

// Password hashing
AdminSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
AdminSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Initialize first admin
const initializeAdmin = async () => {
  const Admin = mongoose.model('Admin');
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  if (adminEmail && adminPassword) {
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      await Admin.create({
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin'
      });
      console.log('Initial admin created');
    }
  }
};

module.exports = mongoose.model('Admin', AdminSchema);
module.exports.initializeAdmin = initializeAdmin;