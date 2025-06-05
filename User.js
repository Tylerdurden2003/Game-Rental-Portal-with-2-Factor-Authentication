const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true }, // ✅ ADD THIS LINE
  emailVerified: { type: Boolean, default: false },
  mobileVerified: { type: Boolean, default: false },
  rentals: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

