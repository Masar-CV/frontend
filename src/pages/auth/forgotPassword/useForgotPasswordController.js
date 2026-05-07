import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import errorHandler from '../../../utils/errorHandler';
import {
  validateEmailStep,
  validateOtpStep,
  validatePasswordStep,
} from './forgotPasswordValidation';

const useForgotPasswordController = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const clearErrorIfNeeded = () => {
    if (error) {
      setError('');
    }
  };

  const subheading = useMemo(() => {
    if (step === 'email') {
      return 'Enter your email to receive an OTP';
    }

    if (step === 'otp') {
      return 'Enter the OTP sent to your email';
    }

    return 'Create a new password';
  }, [step]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    clearErrorIfNeeded();
  };

  const handleOtpChange = (event) => {
    const normalizedOtp = event.target.value.replace(/\D/g, '').slice(0, 6);
    setOtpCode(normalizedOtp);
    clearErrorIfNeeded();
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    clearErrorIfNeeded();
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    clearErrorIfNeeded();
  };

  const handleRequestOtp = async (event) => {
    event.preventDefault();
    setError('');

    const validationError = validateEmailStep(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await authService.requestPasswordReset(email);
      setSuccessMessage('OTP has been sent to your email');
      setStep('otp');
    } catch (err) {
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('ForgotPassword.requestOtp', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError('');

    const validationError = validateOtpStep(otpCode);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await authService.verifyOtp(email, otpCode);
      setSuccessMessage('OTP verified successfully');
      setStep('password');
    } catch (err) {
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('ForgotPassword.verifyOtp', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError('');

    const validationError = validatePasswordStep(newPassword, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(email, otpCode, newPassword);
      setSuccessMessage('Password reset successfully! Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('ForgotPassword.resetPassword', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtpCode('');
    setSuccessMessage('');
  };

  return {
    step,
    subheading,
    email,
    otpCode,
    newPassword,
    confirmPassword,
    error,
    loading,
    successMessage,
    handleEmailChange,
    handleOtpChange,
    handleNewPasswordChange,
    handleConfirmPasswordChange,
    handleRequestOtp,
    handleVerifyOtp,
    handleResetPassword,
    handleBackToEmail,
  };
};

export default useForgotPasswordController;
