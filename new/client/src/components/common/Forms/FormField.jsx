import React from 'react';

const FormField = ({ field, value, onChange, name }) => {
  const Icon = field.icon;
  
  return (
    <div className="relative group">
      {/* Icon */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[rgb(1,95,116)] transition-colors">
        <Icon size={20} />
      </div>
      
      {/* Input Tag */}
      <input 
        type={field.type} 
        id={field.id}
        // ✅ CRITICAL: Using the props passed from parent
        name={name || field.id} 
        value={value}
        onChange={onChange}
        placeholder={field.placeholder}
        className="w-full bg-white border text-gray-900 border-gray-200 focus:border-[rgb(1,95,116)] rounded-xl py-3 pl-12 pr-4 outline-none transition-all shadow-sm"
        required
      />
    </div>
  );
};

export default FormField;