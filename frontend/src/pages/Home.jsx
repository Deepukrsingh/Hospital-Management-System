import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import Statistics from '../components/home/Statistics';
import Testimonials from '../components/home/Testimonials';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-transparent selection:bg-primary/30 selection:text-white">
      {/* Background ambient lighting for the whole page */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-primary/5 to-transparent -z-10 pointer-events-none"></div>

      <main className="relative z-10">
        <Hero />
        <Statistics />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
    </div>
  );
};

export default Home;

