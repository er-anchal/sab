import React, { useState } from 'react';
import axios from 'axios';
import FormField from '../../../common/Forms/FormField';
import FormMessage from '../../../common/Forms/FormMessage';
import SuccessModal from '../../../common/SuccessModal'; // ✅ Added Modal
import { contactFields } from '../../../../data';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // ✅ Controlled State for reliable data capturing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      source: 'Trip Details Contact'
    };

    try {
      const response = await axios.post('http://localhost:5001/api/inquiries', payload);
      
      if (response.status === 201) {
        setShowSuccess(true); // ✅ Show Popup
        setFormData({ name: '', email: '', phone: '', message: '' }); // Clear Form
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert('Failed to send message. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
        title="We received your request!" 
        message="Our travel expert will review your details and call you shortly."
      />

      <fieldset className="w-full min-h-full px-5 sm:px-8 md:px-15 lg:w-1/2 mx-auto bg-[#d4f5fb] pt-4 pb-10 rounded-xl border border-[rgb(1,95,116)]/20 shadow-sm">
        <legend className="text-center mb-6 px-4">
          <p className="text-xl font-bold text-[rgb(1,95,116)] mt-18 sm:mt-15 font-serif">
            Not sure what to do? We'll give you a Call back
          </p>
        </legend>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* ✅ Pass props to FormField so it knows what to display */}
          {contactFields.map((field) => (
            <FormField 
              key={field.id} 
              field={field} 
              name={field.id.toLowerCase()} // Ensures name="name", name="email"
              value={formData[field.id.toLowerCase()]} 
              onChange={handleChange} 
            />
          ))}

          {/* Message Field (Manual because it's often a textarea) */}
          <div className="flex flex-col gap-2">
             <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your plans..."
                rows="4"
                className="w-full p-4 rounded-xl bg-white/80 border border-white focus:border-[rgb(1,95,116)] outline-none text-gray-700 placeholder-gray-400 transition-all resize-none"
             />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#ffd400] hover:bg-[#f0c300] text-black font-bold py-3 rounded-full mt-4 transition-transform active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? 'Sending...' : 'Submit Request'}
          </button>
        </form>
      </fieldset>
    </>
  );
};

export default ContactForm;