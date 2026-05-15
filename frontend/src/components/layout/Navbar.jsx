import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FaHeartbeat, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary transition-colors duration-300">
                <FaHeartbeat className="text-3xl text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">Medicure</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/doctors" 
              className={`font-bold transition-colors ${isActive('/doctors') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Find Doctors
            </Link>
            <Link 
              to="/symptom-checker" 
              className={`font-bold transition-colors flex items-center gap-1 ${isActive('/symptom-checker') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              AI Symptom Checker
            </Link>
            <Link 
              to="/services" 
              className={`font-bold transition-colors ${isActive('/services') ? 'text-primary' : 'text-gray-600 hover:text-primary'}`}
            >
              Services
            </Link>
            
            <div className="w-px h-6 bg-gray-300"></div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-5">
                <Link 
                  to={user?.role === 'Doctor' ? '/dashboard/doctor' : user?.role === 'Admin' ? '/dashboard/admin' : '/dashboard/patient'} 
                  className="font-bold text-gray-600 hover:text-primary transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-full border border-gray-200">
                  <FaUserCircle className="text-xl text-primary" />
                  <span className="font-bold text-sm text-gray-800">{user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-5 py-2 rounded-full font-bold hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 font-bold hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-premium text-white px-6 py-2.5 rounded-full font-bold hover:shadow-premium transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
