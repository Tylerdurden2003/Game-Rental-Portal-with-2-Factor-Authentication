import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Authenticate User
      await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      // Step 2: Generate and send OTP
      await axios.post('http://localhost:5000/api/auth/generateAndSendOtp', {
        email,
      });

      // Step 3: Redirect to OTP verification page
      navigate('/verify-otp', { state: { email } });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>

        {message && <p className="text-red-600 text-sm mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
};

export default LoginPage;



