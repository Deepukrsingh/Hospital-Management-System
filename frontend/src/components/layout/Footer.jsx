import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t border-gray-800 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-primary/20 p-2.5 rounded-xl">
                <FaHeartbeat className="text-3xl text-primary" />
              </div>
              <span className="text-3xl font-extrabold tracking-tight">Medicure</span>
            </div>
            <p className="text-gray-400 text-base mb-8 leading-relaxed">
              Providing world-class healthcare solutions with modern technology and expert medical professionals. Your health, our priority.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"><FaFacebookF /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"><FaTwitter /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"><FaInstagram /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1"><FaLinkedinIn /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Quick Links</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><Link to="/" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Home</Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Find a Doctor</Link></li>
              <li><Link to="/departments" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Departments</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Services</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Online Booking</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Medical Consultation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Lab Tests</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2 group"><FaArrowRight className="text-xs text-primary/0 group-hover:text-primary transition-colors"/> Emergency Care</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6 text-white tracking-wide">Contact</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li className="flex flex-col">
                <span className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Address</span>
                123 Healthcare Ave, Medical District<br/>New York, NY 10001
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Email</span>
                <a href="mailto:info@medicure.com" className="hover:text-primary transition-colors">info@medicure.com</a>
              </li>
              <li className="flex flex-col mt-4">
                <span className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Phone</span>
                <a href="tel:+15551234567" className="hover:text-primary transition-colors">+1 (555) 123-4567</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} Medicure Healthcare. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
