import React, { useState } from 'react';
import axios from 'axios';
import FormField from '../../../common/Forms/FormField';
import FormMessage from '../../../common/Forms/FormMessage';
import { contactFields } from '../../../../data';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Gather data from the form event (Robust method for existing child components)
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name') || formData.get('Name') || '', // Tries both cases
      email: formData.get('email') || formData.get('Email') || '',
      phone: formData.get('phone') || formData.get('Phone') || '',
      message: formData.get('message') || formData.get('Message') || '',
    };

    try {
      // 2. Send to Backend
      await axios.post('http://localhost:5000/api/inquiries', data);
      alert('Message Sent Successfully! We will call you back shortly.');
      e.target.reset(); // Clear the form
    } catch (error) {
      console.error(error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <fieldset className="w-full min-h-full px-5 sm:px-8 md:px-15 lg:w-1/2 mx-auto bg-[#d4f5fb] pt-4 pb-10 rounded-xl">
      <legend className="text-center mb-6">
        <p className="text-xl font-bold text-[rgb(1,95,116)] mt-18 sm:mt-15">
          Not sure what to do? We'll give you a Call back
        </p>
      </legend>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Input Fields - Ensure your data.js fields have 'name' attributes matching the keys above */}
        {contactFields.map((field) => (
          <FormField key={field.id} field={field} />
        ))}

        {/* Message Textarea */}
        <FormMessage />

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-[#ffd400] hover:bg-[#f0c300] text-black font-bold py-2 rounded-full mt-2 transition-colors disabled:opacity-50 cursor-pointer"
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>
    </fieldset>
  );
};

export default ContactForm;