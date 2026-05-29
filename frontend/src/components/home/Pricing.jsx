import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const Pricing = () => {
  const plans = [
    {
      name: "Basic Care",
      price: "Free",
      desc: "Essential healthcare access for everyone.",
      features: ["AI Symptom Checker", "Find Doctors", "Basic Health Articles", "Standard Support"],
      isPopular: false
    },
    {
      name: "Premium Care",
      price: "₹2,499",
      period: "/month",
      desc: "Advanced features for proactive health.",
      features: ["Everything in Basic", "Priority Appointments", "Telemedicine Calls (2/mo)", "Detailed Analytics", "24/7 Premium Support"],
      isPopular: true
    },
    {
      name: "Family Plan",
      price: "₹6,599",
      period: "/month",
      desc: "Comprehensive care for the whole family.",
      features: ["Everything in Premium", "Up to 5 Family Members", "Unlimited Telemedicine", "Home Sample Collection", "Dedicated Health Coach"],
      isPopular: false
    }
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Transparent <span className="text-gradient">Pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-text-secondary"
          >
            Choose the plan that best fits your healthcare needs.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 items-center">
          {plans.map((plan, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
               className={`rounded-3xl p-8 relative ${plan.isPopular ? 'glass-card-dark border-primary/50 shadow-[0_0_40px_rgba(59,130,246,0.25)] hover-glow-blue md:-translate-y-4' : 'glass-card-dark hover-glow-blue'}`}
             >
               {plan.isPopular && (
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-premium text-white px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-text-secondary text-sm mb-6 h-10">{plan.desc}</p>
              <div className="mb-8">
                <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.period && <span className="text-text-secondary">{plan.period}</span>}
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <FaCheck className="text-primary mt-1 shrink-0" />
                    <span className="text-text-secondary text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${plan.isPopular ? 'bg-gradient-premium text-white hover:shadow-premium-hover' : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
