export const validateSignIn = (formData) => {
  const errors = {};
  if (!formData.email) errors.email = 'Email is required';
  if (!formData.password) errors.password = 'Password is required';
  return errors;
};

export const validateSignUp = (formData) => {
  const errors = {};

  // Relaxed Username: Allow spaces, just check if it's not empty
  if (!formData.username.trim()) {
    errors.username = 'Username is required';
  } else if (formData.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  // Relaxed Email
  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = 'Email is invalid';
  }

  // Relaxed Password: Just check length
  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (formData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};