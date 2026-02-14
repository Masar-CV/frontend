import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import errorHandler from '../../utils/errorHandler';
import cvImage from '../../assets/images/cv.svg';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email', 'otp', 'password'
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  /**
   * Step 1: Request OTP with email
   */
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email');
      return;
    }

    setLoading(true);

    try {
      await authService.requestPasswordReset(email);
      setSuccessMessage('OTP has been sent to your email');
      setStep('otp');
      setError('');
    } catch (err) {
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('ForgotPassword.requestOtp', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 2: Verify OTP
   */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');

    // Validate OTP
    if (!otpCode.trim()) {
      setError('OTP code is required');
      return;
    }
    if (!/^\d{6}$/.test(otpCode)) {
      setError('OTP must be exactly 6 digits');
      return;
    }

    setLoading(true);

    try {
      await authService.verifyOtp(email, otpCode);
      setSuccessMessage('OTP verified successfully');
      setStep('password');
      setError('');
    } catch (err) {
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('ForgotPassword.verifyOtp', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Step 3: Reset Password
   */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords
    if (!newPassword) {
      setError('New password is required');
      return;
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await authService.resetPassword(email, otpCode, newPassword);
      setSuccessMessage('Password reset successfully! Redirecting to login...');
      setError('');
      
      // Redirect to login after 2 seconds
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

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-left">
        <div className="forgot-password-left-content">
          <h1 className="forgot-password-title">
            Reset Your<br /> Password
          </h1>
        </div>
        <img 
          src={cvImage} 
          alt="Reset Password" 
          className="forgot-password-image"
        />
      </div>

      <div className="forgot-password-right">
        <div className="forgot-password-form-container">
          <div className="forgot-password-header">
            <h2 className="forgot-password-heading">
              Forgot Password
            </h2>
            <p className="forgot-password-subheading">
              {step === 'email' && 'Enter your email to receive an OTP'}
              {step === 'otp' && 'Enter the OTP sent to your email'}
              {step === 'password' && 'Create a new password'}
            </p>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="form-success">
              {successMessage}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="form-error">
              {error}
            </div>
          )}

          {/* Step 1: Email */}
          {step === 'email' && (
            <form onSubmit={handleRequestOtp}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="form-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={loading}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* Step 2: OTP Verification */}
          {step === 'otp' && (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label htmlFor="otp" className="form-label">OTP Code</label>
                <input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="form-input"
                  value={otpCode}
                  onChange={(e) => {
                    setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    if (error) setError('');
                  }}
                  maxLength="6"
                  disabled={loading}
                  required
                />
                <small>
                  Check your email for the 6-digit code
                </small>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setStep('email');
                  setOtpCode('');
                  setSuccessMessage('');
                }}
                disabled={loading}
              >
                Back to Email
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 'password' && (
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                  className="form-input"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={loading}
                  required
                />
                <small>
                  Minimum 8 characters
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="form-input"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) setError('');
                  }}
                  disabled={loading}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
            </form>
          )}

          {/* Back to Login */}
          <div className="form-footer">
            Remember your password?{' '}
            <Link to="/login" className="form-link">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
