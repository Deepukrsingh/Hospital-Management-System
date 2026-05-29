import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaCalendarCheck, FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center bg-transparent text-white border-b border-white/5">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
      <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/20 blur-[120px] -z-10 opacity-40"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] -z-20 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 text-primary font-bold text-sm mb-8 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Modern Healthcare Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.1] mb-8 tracking-tight">
              Future of Medical <br className="hidden md:block" />
              <span className="text-gradient">Care is Here</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Experience world-class medical care with our expert team of doctors and state-of-the-art facilities. Powered by advanced AI to provide you the best diagnosis.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto justify-center">
              <Link to="/register" className="group flex items-center justify-center gap-2 bg-gradient-premium text-white text-center px-8 py-4 rounded-xl font-bold hover:shadow-premium-hover transition-all duration-300 transform hover:-translate-y-1">
                Book Appointment
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/doctors" className="glass text-white border border-gray-600 text-center px-8 py-4 rounded-xl font-bold hover:bg-white/5 hover:border-gray-400 transition-all duration-300 transform hover:-translate-y-1">
                Find a Specialist
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="w-full mt-20 relative"
          >
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-3xl border border-white/10 shadow-2xl mx-auto max-w-5xl">
              <div className="bg-card rounded-xl overflow-hidden border border-white/5 aspect-video md:aspect-[21/9] relative flex items-center justify-center bg-[url('/images/operating_room.png')] bg-cover bg-center">
                <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[0.5px]"></div>
                
                {/* Floating UI Elements inside the preview to give it a dashboard feel */}
                <div className="absolute top-8 left-8 glass-card-dark p-4 rounded-xl hidden md:block animate-[bounce_4s_infinite]">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-3 rounded-lg"><FaUserMd className="text-primary text-xl" /></div>
                    <div>
                      <div className="text-sm text-gray-400">Available Doctors</div>
                      <div className="text-xl font-bold text-white">124+</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-8 right-8 glass-card-dark p-4 rounded-xl hidden md:block animate-[bounce_5s_infinite_reverse]">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary/20 p-3 rounded-lg"><FaCalendarCheck className="text-secondary text-xl" /></div>
                    <div>
                      <div className="text-sm text-gray-400">Appointments Today</div>
                      <div className="text-xl font-bold text-white">1,492</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
