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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-dark py-3 border-b border-white/5 shadow-glass-dark' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary transition-colors duration-300 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <FaHeartbeat className="text-3xl text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">Medicure</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {/* Guest or Patient Links */}
            {(!isAuthenticated || user?.role === 'Patient') && (
              <>
                <Link 
                  to="/doctors" 
                  className={`font-semibold transition-colors ${isActive('/doctors') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Find Doctors
                </Link>
                <Link 
                  to="/symptom-checker" 
                  className={`font-semibold transition-colors flex items-center gap-1 ${isActive('/symptom-checker') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  AI Symptom Checker
                </Link>
                <Link 
                  to="/health-checkups" 
                  className={`font-semibold transition-colors ${isActive('/health-checkups') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Health Checkups
                </Link>
                <Link 
                  to="/services" 
                  className={`font-semibold transition-colors ${isActive('/services') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Services
                </Link>
                {isAuthenticated && (
                  <Link 
                    to="/dashboard/patient" 
                    state={{ tab: 'appointments' }} 
                    className={`font-semibold transition-colors ${location.pathname === '/dashboard/patient' && location.state?.tab === 'appointments' ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                  >
                    Appointments
                  </Link>
                )}
              </>
            )}

            {/* Doctor Specific Links */}
            {isAuthenticated && user?.role === 'Doctor' && (
              <>
                <Link 
                  to="/dashboard/doctor" 
                  state={{ tab: 'schedule' }} 
                  className={`font-semibold transition-colors ${location.pathname === '/dashboard/doctor' && location.state?.tab === 'schedule' ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  My Schedule
                </Link>
                <Link 
                  to="/services" 
                  className={`font-semibold transition-colors ${isActive('/services') ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Services
                </Link>
                <Link 
                  to="/dashboard/doctor" 
                  state={{ tab: 'appointments' }} 
                  className={`font-semibold transition-colors ${location.pathname === '/dashboard/doctor' && location.state?.tab === 'appointments' ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Appointments
                </Link>
              </>
            )}

            {/* Admin Specific Links */}
            {isAuthenticated && user?.role === 'Admin' && (
              <>
                <Link 
                  to="/dashboard/admin" 
                  state={{ tab: 'doctors' }} 
                  className={`font-semibold transition-colors ${location.pathname === '/dashboard/admin' && location.state?.tab === 'doctors' ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Manage Doctors
                </Link>
                <Link 
                  to="/dashboard/admin" 
                  state={{ tab: 'patients' }} 
                  className={`font-semibold transition-colors ${location.pathname === '/dashboard/admin' && location.state?.tab === 'patients' ? 'text-primary' : 'text-gray-300 hover:text-white'}`}
                >
                  Manage Patients
                </Link>
              </>
            )}
            
            <div className="w-px h-6 bg-white/10"></div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-5">
                <Link 
                  to={user?.role === 'Doctor' ? '/dashboard/doctor' : user?.role === 'Admin' ? '/dashboard/admin' : '/dashboard/patient'} 
                  className="font-semibold text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full border bg-dark-card border-white/10 shadow-sm">
                  <FaUserCircle className="text-xl text-primary" />
                  <span className="font-semibold text-sm text-gray-200">{user?.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full font-semibold transition-all duration-300 border bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="font-semibold transition-colors text-gray-300 hover:text-white"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="bg-gradient-premium text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-0.5"
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
