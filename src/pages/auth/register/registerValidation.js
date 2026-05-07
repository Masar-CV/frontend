const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FULL_NAME_PATTERN = /^[a-zA-Z\s]+$/;

export const validateRegisterForm = ({ formData, termsAccepted }) => {
  if (!formData.fullName.trim()) {
    return 'Full name is required';
  }

  if (formData.fullName.trim().length < 2) {
    return 'Full name must be at least 2 characters';
  }

  if (!FULL_NAME_PATTERN.test(formData.fullName)) {
    return 'Full name can only contain letters and spaces';
  }

  if (!formData.email.trim()) {
    return 'Email is required';
  }

  if (!EMAIL_PATTERN.test(formData.email)) {
    return 'Please enter a valid email';
  }

  if (!formData.password) {
    return 'Password is required';
  }

  if (formData.password.length < 8) {
    return 'Password must be at least 8 characters';
  }

  if (!termsAccepted) {
    return 'You must accept Terms & Privacy';
  }

  return '';
};
