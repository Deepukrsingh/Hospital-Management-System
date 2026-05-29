import React from 'react';
import { motion } from 'framer-motion';
import { FaUserMd, FaAmbulance, FaStethoscope, FaFlask } from 'react-icons/fa';

const Features = () => {
  const features = [
    { icon: <FaUserMd />, title: "Expert Consultations", desc: "Consult with top-rated specialists across various departments using high-quality video or in-person visits." },
    { icon: <FaAmbulance />, title: "Emergency Care", desc: "24/7 emergency medical services with rapid response teams available at the push of a button." },
    { icon: <FaStethoscope />, title: "Health Checkups", desc: "Comprehensive full-body health screening packages tailored to your age, lifestyle, and history." },
    { icon: <FaFlask />, title: "Laboratory Tests", desc: "Advanced diagnostic and pathology laboratory services with same-day digital results." }
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Premium <span className="text-gradient">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-secondary"
          >
            We offer a wide range of specialized medical services designed to meet your healthcare needs with compassion and excellence.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card-dark rounded-2xl p-8 transition-all duration-300 group hover:border-primary/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] relative overflow-hidden hover-glow-blue"
            >
              {/* Top border glow effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-premium opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-6 group-hover:bg-gradient-premium group-hover:text-white transition-all duration-300 shadow-sm">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
