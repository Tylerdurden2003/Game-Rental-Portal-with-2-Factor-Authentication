const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyOtp, generateAndSendOtp } = require('../controllers/authController');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// OTP verify
router.post('/verifyOtp', verifyOtp);

// ✅ OTP generate and send (you probably missed this line)
router.post('/generateAndSendOtp', generateAndSendOtp);

module.exports = router;


