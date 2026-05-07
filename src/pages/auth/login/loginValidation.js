const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateLoginForm = ({ email, password }) => {
  if (!email.trim()) {
    return 'Email is required';
  }

  if (!EMAIL_PATTERN.test(email)) {
    return 'Please enter a valid email';
  }

  if (!password) {
    return 'Password is required';
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }

  return '';
};
