import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Patient",
      image: "https://i.pravatar.cc/150?img=47",
      content: "The AI symptom checker is incredible. It gave me insights that helped my doctor diagnose my condition much faster. Truly a premium experience."
    },
    {
      name: "Michael Chen",
      role: "Regular Checkup",
      image: "https://i.pravatar.cc/150?img=11",
      content: "Booking appointments and viewing my test results has never been easier. The dashboard is beautiful and works flawlessly on my phone."
    },
    {
      name: "Emily Rodriguez",
      role: "Cardiac Patient",
      image: "https://i.pravatar.cc/150?img=5",
      content: "I've been to many hospitals, but the care and the technology here are unmatched. Their platform keeps me connected with my cardiologist."
    }
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
            Loved by <span className="text-gradient">Thousands</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400"
          >
            Don't just take our word for it. Here is what our patients have to say about their experience.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-dark rounded-2xl p-8 relative group hover:border-primary/30 hover-glow-blue transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={item.image} alt={item.name} className="w-14 h-14 rounded-full border-2 border-primary/50 object-cover" />
                <div>
                  <h4 className="text-white font-bold">{item.name}</h4>
                  <p className="text-sm text-primary">{item.role}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed italic">"{item.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
