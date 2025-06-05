import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyOtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(30);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!email) {
      setMessage('Email not found. Please login again.');
    }
  }, [email]);

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/verifyOtp', { email, otp });
      setMessage('✅ OTP verified! Redirecting...');
      setTimeout(() => navigate('/games'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || '❌ OTP verification failed');
      setOtp(''); // Clear OTP field on failure
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      await axios.post('http://localhost:5000/api/auth/generateAndSendOtp', { email });
      setMessage('🔁 OTP resent to your email.');
      setResendCooldown(30);
    } catch (err) {
      setMessage('❌ Failed to resend OTP');
    } finally {
      setResending(false);
    }
  };

  const maskedEmail = email?.replace(/(.{2})(.*)(?=@)/, (_, a, b) => a + '*'.repeat(b.length));

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleVerify} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Verify OTP</h2>
        <p className="text-sm mb-4 text-gray-600 text-center">
          Enter the OTP sent to <strong>{maskedEmail}</strong>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
          Verify
        </button>

        <button
          type="button"
          className="w-full mt-3 text-blue-600 hover:underline text-sm"
          onClick={handleResendOtp}
          disabled={resendCooldown > 0 || resending}
        >
          {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
        </button>

        {message && <p className="text-center text-sm mt-4 text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default VerifyOtpPage;
