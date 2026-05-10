import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaBaby, FaBone, FaTooth, FaEye } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      title: 'Cardiology',
      description: 'Comprehensive care for your heart including diagnostics, treatment, and surgery.',
      icon: <FaHeartbeat className="text-4xl text-red-500" />
    },
    {
      title: 'Neurology',
      description: 'Expert treatment for disorders of the nervous system, brain, and spinal cord.',
      icon: <FaBrain className="text-4xl text-purple-500" />
    },
    {
      title: 'Pediatrics',
      description: 'Specialized healthcare for infants, children, and adolescents.',
      icon: <FaBaby className="text-4xl text-blue-500" />
    },
    {
      title: 'Orthopedics',
      description: 'Treatment for bone, joint, ligament, tendon, and muscle conditions.',
      icon: <FaBone className="text-4xl text-amber-500" />
    },
    {
      title: 'Dentistry',
      description: 'Complete dental care ranging from routine cleanings to advanced oral surgery.',
      icon: <FaTooth className="text-4xl text-teal-500" />
    },
    {
      title: 'Ophthalmology',
      description: 'Advanced eye care including vision testing, cataract surgery, and laser treatments.',
      icon: <FaEye className="text-4xl text-indigo-500" />
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our <span className="text-primary">Medical Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            We offer a wide range of specialized medical services using state-of-the-art technology and expert healthcare professionals.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <a href="/doctors" className="text-primary font-bold hover:text-primary-dark flex items-center gap-2">
                  Find a Specialist <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Services;
