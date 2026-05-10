import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <FaHeartbeat className="text-3xl text-primary" />
              <span className="text-2xl font-bold tracking-tight">Medicure</span>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Providing world-class healthcare solutions with modern technology and expert medical professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebookF /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedinIn /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/doctors" className="hover:text-primary transition">Find a Doctor</Link></li>
              <li><Link to="/departments" className="hover:text-primary transition">Departments</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Services</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-primary transition">Online Booking</a></li>
              <li><a href="#" className="hover:text-primary transition">Medical Consultation</a></li>
              <li><a href="#" className="hover:text-primary transition">Lab Tests</a></li>
              <li><a href="#" className="hover:text-primary transition">Emergency Care</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>123 Healthcare Ave, Medical District</li>
              <li>New York, NY 10001</li>
              <li className="mt-4">Email: info@medicure.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Medicure Hospital Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
