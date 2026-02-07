import React from 'react';
import { Link } from 'react-router-dom';
import { honeymoonDestinations } from '../../../data';

const RomanticDestinations = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white via-pink-50 to-white">
      <div className="container mx-auto px-4 text-center">
        {/* Restored exact Title, Font Size (5xl/7xl), and Color */}
        <h2 className="text-[#f68a95] text-5xl md:text-7xl mb-12 font-tangerine-custom text-shadow-custom">
          Your Love Story Our Destinations...
        </h2>
        
        {/* Restored Grid Layout (max-w-6xl, gap-8) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {honeymoonDestinations.map((item, idx) => {
            // Safe ID generation for the link
            const linkId = item.id || (item.alt || "").toLowerCase().replace(/\s+/g, '-');

            return (
              /* Turned the div into a Link, but kept ALL original classes:
                 - aspect-square (Maintains the size relative to width)
                 - rounded-full (Perfect circle)
                 - border-4 border-white (Your specific border style)
                 - shadow-xl
              */
              <Link 
                to={`/package/${linkId}`}
                key={idx} 
                className="group relative aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white cursor-pointer hover:scale-105 transition-all duration-300 block"
              >
                <img 
                  src={item.img} 
                  alt={item.alt} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Optional: Add a subtle tooltip/overlay on hover if you want users to know the name, 
                    since the text below is gone. But for now, keeping it EXACTLY like your repo. 
                */}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RomanticDestinations;