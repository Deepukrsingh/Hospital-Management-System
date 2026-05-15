import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaAmbulance, FaStethoscope, FaFlask, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import heroImg from '../assets/hero.png';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-48 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/20 blur-[120px] -z-10"></div>
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6 border border-primary/20 shadow-sm">
                🌟 Transforming Healthcare
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
                Your Health is Our <br/>
                <span className="text-gradient">Top Priority</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                Experience world-class medical care with our expert team of doctors and state-of-the-art facilities. Book your appointment today and take the first step towards better health.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link to="/doctors" className="group flex items-center justify-center gap-2 bg-gradient-premium text-white text-center px-8 py-4 rounded-full font-bold hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1">
                  Find a Doctor
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/register" className="glass text-gray-800 border border-gray-200 text-center px-8 py-4 rounded-full font-bold hover:bg-gray-50 hover:shadow-premium transition-all duration-300 transform hover:-translate-y-1">
                  Create Account
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-3xl p-2 bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
                <img 
                  src={heroImg} 
                  alt="Medical Professionals" 
                  className="rounded-2xl object-cover h-[550px] w-full"
                />
              </div>
              
              {/* Floating Badge 1 */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 -left-10 glass p-5 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-full">
                  <FaUserMd className="text-primary text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Expert Doctors</p>
                  <p className="text-lg font-extrabold text-gray-900">50+ Specialists</p>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -right-8 glass p-5 rounded-2xl shadow-xl flex items-center gap-4"
              >
                <div className="bg-green-100 p-3 rounded-full">
                  <FaCalendarCheck className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Appointments</p>
                  <p className="text-lg font-extrabold text-gray-900">10,000+ Booked</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-surface relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Our Premium <span className="text-primary">Services</span></h2>
            <p className="text-xl text-gray-600">We offer a wide range of specialized medical services designed to meet your healthcare needs with compassion and excellence.</p>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(170,59,255,0.15)] hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center text-primary text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to take control of your health?</h2>
            <p className="text-primary-100 text-xl mb-10 max-w-2xl mx-auto opacity-90">
              Join thousands of satisfied patients who trust Medicure for their healthcare needs.
            </p>
            <Link to="/register" className="inline-block bg-white text-primary px-10 py-4 rounded-full font-extrabold hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl text-lg transform hover:-translate-y-1">
              Book an Appointment Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

