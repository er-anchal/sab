import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import InputField from '../../common/Forms/InputField';
import SocialMedia from './SocialMedia';
import { validateSignIn } from './validation';

const SignInForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const validationErrors = validateSignIn(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const data = await login(formData.email, formData.password);
      if (data.isAdmin) navigate('/admin/dashboard');
      else navigate('/');
    } catch (error) {
      setErrors({ password: error.response?.data?.message || 'Login failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <h2 className="title">Sign in</h2>
      <InputField
        icon="✉️" type="email" name="email" placeholder="Email"
        value={formData.email} onChange={handleChange} error={errors.email}
      />
      <InputField
        icon="🔒" type="password" name="password" placeholder="Password"
        value={formData.password} onChange={handleChange} error={errors.password}
      />
      <button type="submit" className="btn solid" disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      <p className="social-text">Or Sign in with social platforms</p>
      <SocialMedia />
    </form>
  );
};

export default SignInForm;