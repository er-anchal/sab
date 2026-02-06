import React from 'react';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import ribbon from '../../../assets/banner/ribbon.svg';

const HoneymoonContact = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-center text-[#015f74] text-6xl md:text-7xl mb-10 font-tangerine-custom text-shadow-light">
        Contact Us
      </h2>
      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 bg-[#d4f5fb] p-8 rounded-2xl border border-blue-100 shadow-lg">
           <p className="text-center font-bold text-[#015f74] text-xl mb-6">Not sure what to do? We’ll give you a Call back</p>
           <form className="space-y-4">
              <div className="flex bg-white rounded border overflow-hidden p-2 items-center">
                 <User size={18} className="text-gray-400 mr-2"/>
                 <input className="w-full outline-none text-sm" placeholder="Enter your name" />
              </div>
              <div className="flex bg-white rounded border overflow-hidden p-2 items-center">
                 <Mail size={18} className="text-gray-400 mr-2"/>
                 <input className="w-full outline-none text-sm" type="email" placeholder="Enter your Email Id" />
              </div>
              <div className="flex bg-white rounded border overflow-hidden p-2 items-center">
                 <Phone size={18} className="text-gray-400 mr-2"/>
                 <input className="w-full outline-none text-sm" type="tel" placeholder="Enter your 10 digit number" />
              </div>
              <div className="flex bg-white rounded border overflow-hidden p-2 items-start">
                 <MessageSquare size={18} className="text-gray-400 mr-2 mt-1"/>
                 <textarea className="w-full outline-none text-sm resize-none" rows="3" placeholder="Write your message"></textarea>
              </div>
              <button className="w-full bg-[#ffd400] hover:bg-[#e6bf00] font-bold py-3 rounded text-[#015f74] transition-colors cursor-pointer">Submit</button>
           </form>
        </div>
        <div className="hidden md:block w-1/2">
           <img src={ribbon} alt="Decoration" className="w-full h-auto opacity-90" />
        </div>
      </div>
    </section>
  );
};

export default HoneymoonContact;