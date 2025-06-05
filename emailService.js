const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOtpToDev = async (otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // always send to your dev inbox
    subject: 'Game Rental Portal - OTP Verification',
    text: `Your OTP is: ${otp}`
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOtpToDev };
