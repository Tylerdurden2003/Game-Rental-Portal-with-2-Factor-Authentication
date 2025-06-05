import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message || 'Registration successful! Redirecting to login...');

      // ✅ Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed. Try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Register
        </button>

        {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;



