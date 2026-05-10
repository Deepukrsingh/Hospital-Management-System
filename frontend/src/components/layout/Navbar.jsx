import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { FaHeartbeat, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaHeartbeat className="text-3xl text-primary" />
              <span className="text-2xl font-bold text-gray-900 tracking-tight">Medicure</span>
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/doctors" className="text-gray-600 hover:text-primary transition font-medium">Find Doctors</Link>
            <Link to="/symptom-checker" className="text-gray-600 hover:text-primary transition font-medium flex items-center gap-1">
              AI Symptom Checker
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-primary transition font-medium">Services</Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to={user?.role === 'Doctor' ? '/dashboard/doctor' : user?.role === 'Admin' ? '/dashboard/admin' : '/dashboard/patient'} 
                  className="text-gray-600 hover:text-primary transition font-medium"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 text-gray-700">
                  <FaUserCircle className="text-2xl" />
                  <span className="font-medium">{user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-red-50 text-red-600 px-4 py-2 rounded-full font-medium hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-primary font-medium hover:text-primary-dark transition"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-dark shadow-sm hover:shadow transition"
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
