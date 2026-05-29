import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const FAQ = () => {
  const faqs = [
    {
      question: "How does the AI Symptom Checker work?",
      answer: "Our AI Symptom Checker uses advanced machine learning algorithms trained on vast medical databases. It analyzes the symptoms you input to provide a probabilistic list of potential conditions. Please note, it is for informational purposes and not a substitute for professional medical diagnosis."
    },
    {
      question: "Can I book telemedicine appointments?",
      answer: "Yes, you can easily book telemedicine appointments with our specialists. Once booked, you will receive a secure video link for your consultation."
    },
    {
      question: "Are my medical records secure?",
      answer: "Absolutely. We use enterprise-grade encryption and comply with all healthcare data protection regulations (like HIPAA) to ensure your personal and medical information is strictly confidential."
    },
    {
      question: "How do I access my lab results?",
      answer: "Once your lab tests are completed, the results are automatically uploaded to your Patient Dashboard. You can view, download, and share them with your doctors directly from the platform."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative z-10 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card-dark rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                onClick={() => toggleAccordion(index)}
              >
                <span className="text-lg font-semibold text-white group-hover:text-primary transition-colors">{faq.question}</span>
                <FaChevronDown 
                  className={`text-primary transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-text-secondary">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
