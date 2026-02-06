import React from 'react';
import Navbar from '../components/layout/Navbar/Navbar';
import Footer from '../components/layout/Footer/Footer';
import Features from '../components/sections/Home/Features';
import { honeymoonAssets } from '../data';

// Import Bifurcated Sections
import HoneymoonHero from '../components/sections/Honeymoon/HoneymoonHero';
import RomanticDestinations from '../components/sections/Honeymoon/RomanticDestinations';
import HoneymoonPackages from '../components/sections/Honeymoon/HoneymoonPackages'; // Now includes its own styles
import HoneymoonLeadForm from '../components/sections/Honeymoon/HoneymoonLeadForm';
import HoneymoonTestimonials from '../components/sections/Honeymoon/HoneymoonTestimonials';
import HoneymoonFAQ from '../components/sections/Honeymoon/HoneymoonFAQ';
import HoneymoonContact from '../components/sections/Honeymoon/HoneymoonContact';

const Honeymoon = () => {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Global Fonts for the Page 
        (These affect multiple components so they stay here or in index.css) 
      */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lugrasimo&family=Tangerine:wght@400;700&display=swap');
        
        .font-tangerine-custom {
          font-family: "Tangerine", cursive;
        }
        
        .text-shadow-custom {
          text-shadow: 3px 0 2px black;
        }
        
        .text-shadow-light {
          text-shadow: 3px 0 2px rgb(134, 167, 182);
        }
      `}</style>

      <Navbar />

      <main>
        <HoneymoonHero />
        
        <RomanticDestinations />

        {/* Banner Section */}
        <section className="w-full pb-10">
           <img src={honeymoonAssets.banner} alt="Banner" className="w-full h-auto" />
        </section>

        {/* Fixed Packages Section */}
        <HoneymoonPackages />

        <HoneymoonLeadForm />

        <HoneymoonTestimonials />

        <HoneymoonFAQ />

        <div className="py-10">
          <Features />
        </div>

        <HoneymoonContact />
      </main>

      <Footer />
    </div>
  );
};

export default Honeymoon;