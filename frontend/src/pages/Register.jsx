import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeartbeat, FaEnvelope, FaLock, FaUser, FaArrowRight } from 'react-icons/fa';
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
    <div className="min-h-screen flex text-white relative">
      {/* Left side - Image/Gradient */}
      <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-primary/5">
        <div className="absolute inset-0 bg-gradient-premium opacity-90 mix-blend-multiply"></div>
        
        <div className="relative w-full flex flex-col justify-center items-center px-12 text-white z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-dark p-12 rounded-3xl max-w-lg"
          >
            <h3 className="text-4xl font-extrabold mb-6 leading-tight">Join Our Healthcare Community</h3>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed">
              Create an account to unlock personalized healthcare services, manage your family's health records, and seamlessly book appointments.
            </p>
            <div className="flex justify-center gap-6 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-sm text-gray-300">Specialists</p>
              </div>
              <div className="w-px bg-white/20"></div>
              <div className="text-center">
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm text-gray-300">Support</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto w-full max-w-md"
        >
          <div className="mb-8 text-center sm:text-left">
            <Link to="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <FaHeartbeat className="text-2xl text-primary" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">Medicure</span>
            </Link>
            <h2 className="text-4xl font-extrabold text-white mb-2">Create Account</h2>
            <p className="text-lg text-gray-400">Join us to start your healthcare journey.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-3 py-3.5 border border-white/10 rounded-xl leading-5 glass-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-slate-900/60 transition-all duration-200 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-3 py-3.5 border border-white/10 rounded-xl leading-5 glass-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-slate-900/60 transition-all duration-200 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-11 pr-3 py-3.5 border border-white/10 rounded-xl leading-5 glass-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-slate-900/60 transition-all duration-200 sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>



            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-premium text-sm font-bold text-white ${loading ? 'bg-primary/70 cursor-not-allowed' : 'bg-gradient-premium hover:shadow-premium-hover hover:-translate-y-0.5'} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center sm:text-left">
            <p className="text-base text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-primary hover:text-primary-dark inline-flex items-center gap-1 transition-colors">
                Sign in here <FaArrowRight className="text-xs" />
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
