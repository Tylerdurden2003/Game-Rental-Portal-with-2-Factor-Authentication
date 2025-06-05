const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const otpStore = {}; // Temporary memory storage
const OTP_EXPIRATION = 5 * 60 * 1000; // 5 minutes
const DEV_EMAIL = 'ginseng1sept2003@gmail.com'; // fallback for testing

// ✅ Setup Nodemailer transport
const getTransporter = () =>
  nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

// ✅ Register User
exports.registerUser = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, mobile, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'Registered successfully' });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Generate and Send OTP
exports.generateAndSendOtp = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpId = crypto.randomBytes(8).toString('hex');
  const targetEmail = email.includes('@') ? email : DEV_EMAIL;

  // 🔁 Remove old OTPs for this email before storing new one
  for (const key in otpStore) {
    if (otpStore[key].email === targetEmail) {
      delete otpStore[key];
    }
  }

  otpStore[otpId] = {
    otpId,
    email: targetEmail,
    otp,
    createdAt: Date.now(),
  };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: targetEmail,
    subject: 'Your OTP Code',
    text: `Your OTP is: ${otp}`,
  };

  try {
    const transporter = getTransporter();
    await transporter.sendMail(mailOptions);

    console.log(`✅ OTP sent to ${targetEmail}: ${otp}`);
    res.status(200).json({ message: 'OTP sent successfully', otpId });
  } catch (err) {
    console.error('❌ OTP send error:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// ✅ Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const otpEntry = Object.values(otpStore).find(
    (entry) => entry.email === email
  );

  if (!otpEntry) {
    return res.status(400).json({ message: 'No OTP request found' });
  }

  if (Date.now() - otpEntry.createdAt > OTP_EXPIRATION) {
    delete otpStore[otpEntry.otpId];
    return res.status(400).json({ message: 'OTP expired' });
  }

  if (otp !== otpEntry.otp) {
    return res.status(400).json({ message: 'Incorrect OTP' });
  }

  delete otpStore[otpEntry.otpId];
  res.status(200).json({ message: 'OTP verified' });
};





