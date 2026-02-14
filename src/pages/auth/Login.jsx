import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import errorHandler from '../../utils/errorHandler';
import { SUCCESS_MESSAGES } from '../../utils/constants';
import cvImage from '../../assets/images/cv.svg';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

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
    return true;
  };

  /**
   * Handle form submission
   */
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Call auth service
      const response = await authService.login(
        formData.email,
        formData.password
      );

      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Show success message (optional)
      console.log(SUCCESS_MESSAGES.LOGIN_SUCCESS);

      // Redirect to home
      navigate('/');
    } catch (err) {
      // Get user-friendly error message
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('Login Component', err);
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
      }));
      setRememberMe(true);
    }
  }, []);

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-left-content">
          <h1 className="login-title">
            Let's Pick Up Where<br /> You Left Off
          </h1>
        </div>
        <img 
          src={cvImage} 
          alt="Resume" 
          className="login-resume-image"
        />
      </div>

      <div className="login-right">
        <div className="login-form-container">
          <div className="login-header">
            <h2 className="login-heading">
              Hello,<br /> Welcome Back
            </h2>
            <p className="login-subheading">
              Welcome back to Talent Connect
            </p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            {/* Error Message */}
            {error && (
              <div className="form-error" style={{ color: '#dc3545', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
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

            {/* Form Options */}
            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            {/* Sign Up Link */}
            <div className="form-footer">
              Don't Have an account ?{' '}
              <Link to="/register" className="form-link">
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

