import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaAmbulance, FaStethoscope, FaFlask, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 to-white pt-20 pb-28 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Your Health is Our <span className="text-primary">Top Priority</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Experience world-class medical care with our expert team of doctors and state-of-the-art facilities. Book your appointment today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/doctors" className="bg-primary text-white text-center px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition shadow-lg hover:shadow-xl">
                  Find a Doctor
                </Link>
                <Link to="/register" className="bg-white text-primary border-2 border-primary/20 text-center px-8 py-3 rounded-full font-medium hover:border-primary transition">
                  Create Account
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl transform translate-x-10 translate-y-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869043e560?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Medical Professionals" 
                className="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <FaCalendarCheck className="text-green-600 text-xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Appointments</p>
                  <p className="text-lg font-bold text-gray-900">10,000+ Booked</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Premium Services</h2>
            <p className="text-gray-600">We offer a wide range of specialized medical services designed to meet your healthcare needs with compassion and excellence.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <FaUserMd />, title: "Expert Consultations", desc: "Consult with top-rated specialists across various departments." },
              { icon: <FaAmbulance />, title: "Emergency Care", desc: "24/7 emergency medical services with rapid response teams." },
              { icon: <FaStethoscope />, title: "Health Checkups", desc: "Comprehensive full-body health screening packages." },
              { icon: <FaFlask />, title: "Laboratory Tests", desc: "Advanced diagnostic and pathology laboratory services." }
            ].map((service, index) => (
              <motion.div 
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to take control of your health?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied patients who trust Medicure for their healthcare needs.
          </p>
          <Link to="/register" className="inline-block bg-white text-primary px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg text-lg">
            Book an Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
