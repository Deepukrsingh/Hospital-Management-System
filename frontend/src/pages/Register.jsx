import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Patient' // Default role
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      const resultAction = await dispatch(registerUser(formData));
      
      if (registerUser.fulfilled.match(resultAction)) {
        toast.success('Registration successful! Welcome.');
        const role = resultAction.payload.role;
        if (role === 'Admin') navigate('/dashboard/admin');
        else if (role === 'Doctor') navigate('/dashboard/doctor');
        else navigate('/dashboard/patient');
      }
    } else {
      toast.error('Please fill in all fields');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="bg-primary/10 py-8 px-6 text-center">
          <Link to="/" className="inline-flex items-center space-x-2">
            <FaHeartbeat className="text-4xl text-primary" />
            <span className="text-3xl font-bold text-gray-900 tracking-tight">Medicure</span>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our hospital management platform</p>
        </div>

        <div className="py-8 px-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 bg-gray-50 outline-none border hover:border-gray-400 transition"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 bg-gray-50 outline-none border hover:border-gray-400 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3 bg-gray-50 outline-none border hover:border-gray-400 transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">I am registering as a:</label>
              <div className="flex gap-4">
                <label className="flex-1 flex items-center justify-center py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition has-[:checked]:bg-primary/10 has-[:checked]:border-primary has-[:checked]:text-primary">
                  <input 
                    type="radio" 
                    name="role" 
                    value="Patient" 
                    checked={formData.role === 'Patient'}
                    onChange={handleChange}
                    className="sr-only" 
                  />
                  <span className="font-medium">Patient</span>
                </label>
                <label className="flex-1 flex items-center justify-center py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition has-[:checked]:bg-primary/10 has-[:checked]:border-primary has-[:checked]:text-primary">
                  <input 
                    type="radio" 
                    name="role" 
                    value="Doctor" 
                    checked={formData.role === 'Doctor'}
                    onChange={handleChange}
                    className="sr-only" 
                  />
                  <span className="font-medium">Doctor</span>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary hover:text-primary-dark">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
