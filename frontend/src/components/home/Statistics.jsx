import React from 'react';
import { motion } from 'framer-motion';

const Statistics = () => {
  const stats = [
    { label: "Active Patients", value: "24K+" },
    { label: "Expert Doctors", value: "150+" },
    { label: "Clinic Locations", value: "12" },
    { label: "Patient Satisfaction", value: "99%" }
  ];

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="glass-card-dark rounded-3xl p-10 md:p-16 relative overflow-hidden group hover:border-primary/30 transition-all duration-500 hover-glow-blue">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-premium opacity-10 blur-[100px] pointer-events-none group-hover:opacity-20 transition-opacity duration-500"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-accent mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.35)]">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base font-semibold text-text-secondary">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
