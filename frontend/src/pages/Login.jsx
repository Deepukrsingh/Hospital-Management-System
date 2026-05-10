import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    if (formData.email && formData.password) {
      const resultAction = await dispatch(loginUser(formData));
      
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success('Login successful!');
        const role = resultAction.payload.role;
        if (role === 'Admin') navigate('/dashboard/admin');
        else if (role === 'Doctor') navigate('/dashboard/doctor');
        else navigate('/dashboard/patient');
      }
    } else {
      toast.error('Please enter valid credentials');
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
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Welcome back!</h2>
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        <div className="py-8 px-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-primary hover:text-primary-dark">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition`}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
