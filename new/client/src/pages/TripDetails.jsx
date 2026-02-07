import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  MapPin, Clock, CheckCircle, XCircle, ChevronDown, ChevronUp, 
  Heart, Phone, Share2, Star, Calendar, Users, Camera, ShieldCheck, Award 
} from 'lucide-react';
import { 
  honeymoonPackages, 
  indiaData, 
  internationalData, 
  exhilaratingDeals, 
  exclusiveDeals, 
  romanticData,        // ✅ Added
  honeymoonDestinations, // ✅ Added
  assets,
  testimonials 
} from '../data'; 
import Footer from '../components/layout/Footer/Footer';
import ContactModal from '../components/common/ContactModal'; 
import TripCard from '../components/common/Cards/TripCard/TripCard'; 

// --- DATA FETCHING & HELPERS ---
const getAllPackages = () => [
  ...(honeymoonPackages || []),
  ...(indiaData || []),
  ...(internationalData || []),
  ...(exhilaratingDeals || []), 
  ...(exclusiveDeals || []),
  ...(romanticData || []),        // ✅ Included in search
  ...(honeymoonDestinations || []) // ✅ Included in search
];

const findPackageData = (id) => {
  const allPackages = getAllPackages();
  if (!id) return null;

  let found = allPackages.find(p => p.id == id);
  
  // Fallback: finding by slug if ID match fails
  if (!found) {
    const searchSlug = id.toLowerCase();
    found = allPackages.find(p => {
        // Safe check for title or alt
        const titleStr = p.title || p.alt || ""; 
        const pSlug = titleStr.toLowerCase().replace(/\s+/g, '-');
        return pSlug === searchSlug;
    });
  }
  return found;
};

const getSimilarPackages = (currentPkg) => {
  if (!currentPkg) return [];
  
  let sourceArray = [];
  
  // Logic to find related trips based on ID or Category
  const pid = currentPkg.id ? currentPkg.id.toString() : "";
  
  if (pid.startsWith('honey')) sourceArray = honeymoonPackages;
  else if (pid.startsWith('india')) sourceArray = indiaData;
  else if (pid.startsWith('intl')) sourceArray = internationalData;
  else if (pid.startsWith('deal')) sourceArray = exhilaratingDeals;
  else if (pid.startsWith('rom')) sourceArray = romanticData;
  else if (pid.startsWith('dest')) sourceArray = honeymoonDestinations;
  else {
      // Fallback: Match by location name
      const all = getAllPackages();
      const loc = (currentPkg.location || currentPkg.title || "").split(',')[0]; 
      sourceArray = all.filter(p => (p.location || p.title || "").includes(loc));
  }

  // Filter out current and return top 3
  return (sourceArray || []).filter(p => p.id !== currentPkg.id).slice(0, 3);
};

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [similarTrips, setSimilarTrips] = useState([]);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [openDay, setOpenDay] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const data = findPackageData(id);
    if (data) {
      // Handle Image: Some data has 'img', some has 'image', some has 'front'
      const mainImg = data.img || data.image || data.front; 
      // Handle Title: Some data has 'title', some has 'alt'
      const displayTitle = data.title || data.alt;

      setPackageData({
        ...data,
        title: displayTitle,
        gallery: [mainImg, mainImg, mainImg, mainImg], 
        description: data.description || `Escape to the mesmerizing landscapes of ${displayTitle}. This carefully crafted itinerary blends adventure, culture, and relaxation, ensuring you take back memories that last a lifetime. From handpicked stays to expert-guided tours, we've handled every detail.`,
        price: data.price || "On Request",
        duration: data.days || data.duration || "5 Days / 4 Nights",
        location: data.loc || data.location || displayTitle,
        rating: 4.8,
        reviews: 124,
        inclusions: ["Premium Accommodation", "Daily Breakfast & Dinner", "AC Private Transfer", "Expert Tour Guide", "All Entry Tickets"],
        exclusions: ["Airfare / Flight Tickets", "Personal Expenses", "Travel Insurance", "Anything not in inclusions"],
        itinerary: [
          { day: 1, title: "Arrival & Warm Welcome", desc: "Touch down at the airport where our representative greets you. Transfer to your premium hotel. Spend the evening soaking in the local vibe and enjoying a welcome dinner." },
          { day: 2, title: "Cultural Exploration", desc: "After a gourmet breakfast, dive into the history of the city. Visit ancient temples, heritage monuments, and the bustling local bazaars." },
          { day: 3, title: "Adventure Awaits", desc: "Gear up for a thrill! Whether it's hiking, water sports, or a jungle safari, today is about adrenaline. Evening relaxation by a bonfire." },
          { day: 4, title: "Leisure & Local Flavors", desc: "A relaxed start to the day. Explore local cafes, shop for handcrafted souvenirs, or indulge in a spa session. Enjoy a sunset cruise in the evening." },
          { day: 5, title: "Departure", desc: "Bid farewell to this beautiful land. After breakfast, we transfer you to the airport with a bag full of memories." },
        ],
        policies: [
            { title: "Cancellation Rules", rules: ["100% Refund if cancelled 30 days prior.", "50% Refund if cancelled 15 days prior.", "No Refund within 15 days of departure."] },
            { title: "Booking Terms", rules: ["50% Advance to confirm slot.", "Balance payment 7 days before trip."] }
        ]
      });
      setSimilarTrips(getSimilarPackages(data));
    }
  }, [id]);

  if (!packageData) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#f68a95] border-opacity-75 mb-4"></div>
      <p className="text-gray-500 font-medium tracking-wide animate-pulse">Curating your experience...</p>
    </div>
  );

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800 pb-20 md:pb-0">
      
      <style>{`
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: #fff0f3; }
        ::-webkit-scrollbar-thumb { background: #f68a95; border-radius: 4px; }
        * { scrollbar-width: thin; scrollbar-color: #f68a95 #fff0f3; }
      `}</style>

      {/* --- HEADER --- */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-4'} bg-[#f68a95]`}>
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="hover:opacity-90 transition-opacity">
             <img src={assets.logo} alt="WanderOn" className="h-8 md:h-10 w-auto brightness-0 invert" />
          </Link>
          <div className="flex gap-3">
            <button className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors">
              <Share2 size={20} />
            </button>
            <button onClick={() => setIsLiked(!isLiked)} className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
              <Heart size={20} className={isLiked ? "fill-white text-white" : "text-white"} />
            </button>
          </div>
        </div>
      </header>

      {/* --- BREADCRUMBS --- */}
      <div className="pt-24 pb-4 container mx-auto px-4 text-xs md:text-sm text-gray-500 flex items-center gap-2">
         <Link to="/" className="hover:text-[#f68a95] transition-colors">Home</Link> 
         <ChevronDown className="rotate-[-90deg]" size={12}/>
         <span className="capitalize text-gray-800 font-bold truncate max-w-[200px]">{packageData.title}</span>
      </div>

      {/* --- HERO GALLERY --- */}
      <div className="container mx-auto px-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative">
           <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer h-full">
              <img src={packageData.gallery[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
           </div>
           <div className="hidden md:block relative group cursor-pointer h-full">
              <img src={packageData.gallery[1]} alt="Side 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           </div>
           <div className="hidden md:block relative group cursor-pointer h-full">
              <img src={packageData.gallery[2]} alt="Side 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           </div>
           <div className="hidden md:block relative group cursor-pointer h-full">
              <img src={packageData.gallery[3]} alt="Side 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
           </div>
           <div className="hidden md:block relative group cursor-pointer h-full">
              <img src={packageData.gallery[0]} alt="Side 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                 <Camera size={16} /> View Photos
              </button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2">
          {/* Title & Stats */}
          <div className="mb-8 border-b border-gray-100 pb-8">
             <div className="flex flex-wrap gap-2 mb-3">
               <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-100">Bestseller</span>
               <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border border-blue-100">Customizable</span>
             </div>
             <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-tangerine-custom leading-tight">{packageData.title}</h1>
             <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 font-medium">
                <span className="flex items-center gap-2"><MapPin size={18} className="text-[#f68a95]"/> {packageData.location}</span>
                <span className="flex items-center gap-2"><Clock size={18} className="text-[#f68a95]"/> {packageData.duration}</span>
                <span className="flex items-center gap-2"><Star size={18} className="fill-[#ffd400] text-[#ffd400]"/> {packageData.rating} ({packageData.reviews} reviews)</span>
             </div>
          </div>

          {/* About */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Experience the Journey</h2>
            <p className="text-gray-600 leading-relaxed text-lg">{packageData.description}</p>
          </div>

          {/* Sticky Tabs */}
          <div className="sticky top-16 md:top-20 z-40 bg-white py-2 mb-6 border-b border-gray-100">
             <div className="flex gap-6 md:gap-10 overflow-x-auto pb-2">
                {['itinerary', 'inclusions', 'policies', 'reviews'].map(tab => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`pb-2 text-sm font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 ${activeTab === tab ? 'border-[#f68a95] text-[#f68a95]' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                   >
                     {tab}
                   </button>
                ))}
             </div>
          </div>

          {/* TAB CONTENT */}
          {activeTab === 'itinerary' && (
            <div className="mb-12">
               {packageData.itinerary.map((item, idx) => (
                 <div key={idx} className="flex gap-4 md:gap-6 mb-8 group relative">
                    <div className="flex flex-col items-center">
                       <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#f68a95] to-[#e75480] text-white flex items-center justify-center font-bold text-sm md:text-base shrink-0 shadow-lg z-10 ring-4 ring-white">
                          {item.day}
                       </div>
                       {idx !== packageData.itinerary.length - 1 && (
                          <div className="w-0.5 h-full bg-gray-100 absolute top-10 left-4 md:left-5 -z-0"></div>
                       )}
                    </div>
                    <div className="flex-1 pt-1 pb-4 cursor-pointer bg-gray-50 rounded-2xl p-5 hover:bg-white hover:shadow-md transition-all border border-gray-100/50" onClick={() => setOpenDay(openDay === idx ? -1 : idx)}>
                       <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
                          <div className={`transform transition-transform duration-300 ${openDay === idx ? 'rotate-180' : ''}`}>
                             <ChevronDown size={20} className="text-gray-400"/>
                          </div>
                       </div>
                       <div className={`overflow-hidden transition-all duration-300 ${openDay === idx ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                          <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">{item.desc}</p>
                          <div className="flex flex-wrap gap-2">
                             <span className="px-3 py-1 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-200 shadow-sm">🍳 Breakfast</span>
                             <span className="px-3 py-1 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-200 shadow-sm">🏨 Stay</span>
                             <span className="px-3 py-1 bg-white text-gray-600 text-xs font-bold rounded-lg border border-gray-200 shadow-sm">🚗 Transfer</span>
                          </div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          )}
          {/* ... (Inclusions/Policies/Reviews logic remains same as previous version) ... */}
          {activeTab === 'inclusions' && (
             <div className="grid md:grid-cols-2 gap-6 mb-12 animate-fadeIn">
                <div className="bg-green-50/30 p-6 rounded-2xl border border-green-100/50">
                   <h3 className="text-lg font-bold text-green-700 mb-4 flex items-center gap-2"><CheckCircle size={20}/> Included</h3>
                   <ul className="space-y-3">
                      {packageData.inclusions.map((inc, i) => (
                         <li key={i} className="flex gap-3 text-gray-700 text-sm">
                            <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5"/> {inc}
                         </li>
                      ))}
                   </ul>
                </div>
                <div className="bg-red-50/30 p-6 rounded-2xl border border-red-100/50">
                   <h3 className="text-lg font-bold text-red-700 mb-4 flex items-center gap-2"><XCircle size={20}/> Not Included</h3>
                   <ul className="space-y-3">
                      {packageData.exclusions.map((exc, i) => (
                         <li key={i} className="flex gap-3 text-gray-600 text-sm">
                            <XCircle size={16} className="text-red-400 shrink-0 mt-0.5"/> {exc}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          )}
          
          {activeTab === 'policies' && (
             <div className="space-y-4 mb-12 animate-fadeIn">
                {packageData.policies.map((pol, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                      <h3 className="font-bold text-gray-900 mb-3">{pol.title}</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-600 text-sm">
                         {pol.rules.map((rule, r) => <li key={r}>{rule}</li>)}
                      </ul>
                   </div>
                ))}
             </div>
          )}

          {activeTab === 'reviews' && (
            <div className="mb-12 animate-fadeIn">
               <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 flex items-center gap-2">4.8 <Star size={24} className="fill-yellow-400 text-yellow-400"/></div>
                    <p className="text-sm text-gray-500">Based on 124 verified reviews</p>
                  </div>
                  <button className="text-[#f68a95] font-bold text-sm hover:underline">Write a Review</button>
               </div>
               <div className="space-y-6">
                  {testimonials.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                       <div className="flex items-center gap-3 mb-3">
                          <img src={review.img} alt={review.name} className="w-10 h-10 rounded-full object-cover"/>
                          <div>
                             <p className="font-bold text-sm text-gray-900">{review.name}</p>
                             <p className="text-xs text-gray-500">{review.date}</p>
                          </div>
                       </div>
                       <p className="text-gray-600 text-sm italic">"{review.text}"</p>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
           <div className="sticky top-24">
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 overflow-hidden">
                 <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Total Price</p>
                    <div className="flex items-end gap-2">
                       <span className="text-3xl font-bold text-gray-900">{packageData.price}</span>
                       <span className="text-sm text-gray-400 line-through mb-1">₹25,000</span>
                    </div>
                    <div className="mt-2 text-green-600 text-xs font-bold flex items-center gap-1">
                       <CheckCircle size={12}/> Inclusive of all taxes
                    </div>
                 </div>

                 <div className="p-6 space-y-5">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase">Travel Date</label>
                       <input type="date" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#f68a95] transition-all" />
                    </div>

                    <div className="space-y-2">
                       <label className="text-xs font-bold text-gray-500 uppercase">Travelers</label>
                       <div className="grid grid-cols-3 gap-2">
                          {[1, 2, '3+'].map(num => (
                             <button key={num} className="py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:border-gray-900 hover:text-black focus:bg-black focus:text-white transition-all">
                                {num}
                             </button>
                          ))}
                       </div>
                    </div>

                    <button 
                        onClick={() => setIsContactModalOpen(true)}
                        className="w-full bg-gradient-to-r from-[#f68a95] to-[#e75480] hover:from-[#e75480] hover:to-[#d64370] text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-200 transition-all transform hover:-translate-y-0.5"
                    >
                       Send Inquiry
                    </button>
                 </div>
                 
                 <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                    <p className="text-xs text-gray-500 flex justify-center items-center gap-2">
                       <ShieldCheck size={14}/> 100% Safe & Secure
                    </p>
                 </div>
              </div>
              
              <div className="mt-6 flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                 <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                    <Phone size={20}/>
                 </div>
                 <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Need Help?</p>
                    <p className="text-sm font-bold text-gray-900">+91 98765 43210</p>
                 </div>
              </div>
           </div>
        </div>

      </div>

      {/* --- SIMILAR TRIPS SECTION --- */}
      {similarTrips.length > 0 && (
          <div className="container mx-auto px-4 py-12 border-t border-gray-100 mt-8">
             <h2 className="text-2xl md:text-3xl font-bold mb-8 font-tangerine-custom text-gray-800">You Might Also Like</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {similarTrips.map((trip) => (
                   <div key={trip.id} className="h-[420px]">
                      {/* ✅ FIX: Normalize 'img' vs 'image' before passing to TripCard */}
                      <TripCard slide={{
                          ...trip,
                          image: trip.image || trip.img || trip.front || trip.back, // ensure valid image prop
                          title: trip.title || trip.alt // ensure title
                      }} />
                   </div>
                ))}
             </div>
          </div>
      )}

      {/* --- MOBILE STICKY ACTION BAR --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 lg:hidden z-50 flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
         <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Starting from</p>
            <p className="text-xl font-bold text-gray-900">{packageData.price}</p>
         </div>
         <button 
            onClick={() => setIsContactModalOpen(true)}
            className="bg-[#f68a95] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-pink-200"
         >
            Book Now
         </button>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
      
      <Footer />
    </div>
  );
};

export default TripDetails;