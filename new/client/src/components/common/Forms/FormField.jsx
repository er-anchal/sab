import React from 'react';

/**
 * Form field component with icon
 * Updated for high contrast and professional look
 */
const FormField = ({ field }) => {
  return (
    <div className="w-full group">
      <label 
        htmlFor={field.id} 
        className="block text-gray-900 font-semibold text-sm mb-1.5 ml-1"
      >
        {field.label}
      </label>
      <div className="flex relative">
        {/* Icon Container */}
        <span className="bg-gray-50 border border-gray-300 border-r-0 rounded-l-lg px-3 flex items-center justify-center text-gray-500 group-focus-within:border-[rgb(1,95,116)] group-focus-within:text-black transition-colors duration-300">
          <field.icon size={18} />
        </span>
        
        {/* Input */}
        <input 
          type={field.type} 
          id={field.id} 
          className="w-full bg-white border border-gray-300 rounded-r-lg px-4 py-2.5 text-gray-900 text-sm placeholder-gray-500 focus:outline-none focus:border-[rgb(1,95,116)] focus:ring-1 focus:ring-[rgb(1,95,116)] transition-all duration-300" 
          placeholder={field.placeholder}
          required
        />
      </div>
    </div>
  );
};

export default FormField;