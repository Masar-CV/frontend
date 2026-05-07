const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OTP_PATTERN = /^\d{6}$/;

export const validateEmailStep = (email) => {
  if (!email.trim()) {
    return 'Email is required';
  }

  if (!EMAIL_PATTERN.test(email)) {
    return 'Please enter a valid email';
  }

  return '';
};

export const validateOtpStep = (otpCode) => {
  if (!otpCode.trim()) {
    return 'OTP code is required';
  }

  if (!OTP_PATTERN.test(otpCode)) {
    return 'OTP must be exactly 6 digits';
  }

  return '';
};

export const validatePasswordStep = (newPassword, confirmPassword) => {
  if (!newPassword) {
    return 'New password is required';
  }

  if (newPassword.length < 8) {
    return 'Password must be at least 8 characters';
  }

  if (newPassword !== confirmPassword) {
    return 'Passwords do not match';
  }

  return '';
};
