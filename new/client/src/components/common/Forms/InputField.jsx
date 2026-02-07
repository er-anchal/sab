import React from 'react';

const InputField = ({ icon, type, name, placeholder, value, onChange, error }) => {
  return (
    <div className="input-field-wrapper">
      <div className={`input-field ${error ? 'error' : ''}`}>
        <i>{icon}</i>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;