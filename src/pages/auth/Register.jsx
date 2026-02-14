import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import errorHandler from '../../utils/errorHandler';
import { SUCCESS_MESSAGES, USER_ROLES } from '../../utils/constants';
import cvImage from '../../assets/images/cv.svg';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: USER_ROLES.STUDENT,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle input field changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Validate form data
   */
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    if (formData.fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      setError('Full name can only contain letters and spaces');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return false;
    }
    if (!termsAccepted) {
      setError('You must accept Terms & Privacy');
      return false;
    }
    return true;
  };

  /**
   * Handle form submission
   */
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call auth service
      const response = await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      // Show success message (optional)
      console.log(SUCCESS_MESSAGES.REGISTER_SUCCESS);

      // Redirect to home
      navigate('/');
    } catch (err) {
      // Get user-friendly error message
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('Register Component', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-left">
        <div className="register-left-content">
          <h1 className="register-title">
            Build Your Future,<br /> Today
          </h1>
        </div>
        <img 
          src={cvImage} 
          alt="Resume" 
          className="register-resume-image"
        />
      </div>

      <div className="register-right">
        <div className="register-form-container">
          <div className="register-header">
            <h2 className="register-heading">
              Get started now
            </h2>
            <p className="register-subheading">
              Enter your credential to get started now.
            </p>
          </div>

          <form className="register-form" onSubmit={handleRegister}>
            {/* Social Login Buttons */}
            <div className="social-buttons">
              <button type="button" className="btn btn-social" disabled={loading}>
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>

              <button type="button" className="btn btn-social" disabled={loading}>
                <svg className="social-icon" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Sign in with Facebook
              </button>
            </div>

            <div className="separator">
              <div className="separator-line"></div>
              <span className="separator-text">or</span>
              <div className="separator-line"></div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="form-error" style={{ color: '#dc3545', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            {/* Full Name Field */}
            <div className="form-group">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="form-input"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
            </div>

            {/* Terms & Privacy Checkbox */}
            <label className="checkbox-label">
              <input 
                type="checkbox" 
                className="checkbox-input"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  if (error) setError('');
                }}
                disabled={loading}
              />
              <span>
                I agree to the{' '}
                <Link to="/terms" className="terms-link">
                  Terms & Privacy
                </Link>
              </span>
            </label>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            {/* Login Link */}
            <div className="form-footer">
              Have an account ?{' '}
              <Link to="/login" className="form-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

