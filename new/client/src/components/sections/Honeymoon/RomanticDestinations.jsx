import React from 'react';
import { honeymoonDestinations } from '../../../data';

const RomanticDestinations = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-[#f68a95] text-5xl md:text-7xl mb-12 font-tangerine-custom text-shadow-custom">
          Your Love Story Our Destinations...
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {honeymoonDestinations.map((item, idx) => (
            <div key={idx} className="group relative aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white cursor-pointer hover:scale-105 transition-all duration-300">
              <img src={item.img} alt={item.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RomanticDestinations;