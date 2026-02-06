import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../../common/Forms/InputField';
import SocialMedia from './SocialMedia';
import { validateSignUp } from './validation';
import { useAuth } from '../../../context/AuthContext'; // Import Context

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Get signup function from Context
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as you type
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Client Validation
    const validationErrors = validateSignUp(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // 2. Call Backend
      await signup(formData.username, formData.email, formData.password);
      
      alert('Account Created Successfully!');
      navigate('/'); 
    } catch (error) {
      console.error("Signup Failed:", error);
      // Show backend error (e.g., "Email already exists")
      setErrors({ 
        email: error.response?.data?.message || 'Signup failed. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign up</h2>

      <InputField
        icon="👤"
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        error={errors.username}
      />

      <InputField
        icon="✉️"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <InputField
        icon="🔒"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Sign up'}
      </button>

      <p className="social-text">Or Sign up with social platforms</p>
      <SocialMedia />
    </form>
  );
};

export default SignUpForm;