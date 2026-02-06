import React from 'react';
import Navbar from './Navbar/Navbar';
import HeroSection from '../sections/Trips/HeroSection';
import ExploreSection from '../sections/Trips/ExploreSection'; // Import the new generic section
import Features from '../sections/Home/Features';
import FAQSection from '../sections/Trips/FAQ/FAQSection';
import TestimonialsSection from '../sections/Trips/TestimonialsSection';
import ContactSection from '../sections/Trips/Contact/ContactSection';
import Footer from './Footer/Footer';

const TripsLayout = ({ 
  heroImage, 
  heroTitle, 
  heroSubtitle, 
  exploreTitle, 
  exploreData 
}) => {
  return (
    <div className="bg-black min-h-screen font-sans">
      <Navbar />
      
      {/* Reusable Hero */}
      <HeroSection 
        backgroundImage={heroImage}
        title={heroTitle}
        subtitle={heroSubtitle}
      />
      
      {/* Reusable Explore Section */}
      <ExploreSection 
        title={exploreTitle} 
        destinationsData={exploreData} 
      />
      
      {/* Common Sections */}
      <Features />
      <FAQSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default TripsLayout;