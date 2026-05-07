import { Link } from 'react-router-dom';
import cvImage from '../../../assets/images/cv.svg';

const LoginView = ({
  formData,
  rememberMe,
  showPassword,
  loading,
  error,
  handleInputChange,
  handleRememberMeChange,
  handleTogglePasswordVisibility,
  handleLogin,
}) => (
  <div className="login-page">
    <div className="login-left">
      <div className="login-left-content">
        <h1 className="login-title">
          Let's Pick Up Where
          <br /> You Left Off
        </h1>
      </div>
      <img src={cvImage} alt="Resume" className="login-resume-image" />
    </div>

    <div className="login-right">
      <div className="login-form-container">
        <div className="login-header">
          <h2 className="login-heading">
            Hello,
            <br /> Welcome Back
          </h2>
          <p className="login-subheading">Welcome back to Talent Connect</p>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {error && <div className="form-error">{error}</div>}

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

          <div className="form-group">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                className="form-input password-input"
                value={formData.password}
                onChange={handleInputChange}
                disabled={loading}
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={handleTogglePasswordVisibility}
                disabled={loading}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 9a3 3 0 0 0-3 3c0 .53.14 1.03.38 1.47l4.09-4.09A2.94 2.94 0 0 0 12 9z"
                    />
                    <path
                      fill="currentColor"
                      d="M2.71 3.51 1.39 4.84l2.44 2.44A11.73 11.73 0 0 0 .9 12s3.27 6 11.1 6c2.2 0 4.06-.48 5.64-1.18l2.97 2.97 1.32-1.33-18.22-18.95zM7.74 11.24l1.86 1.86A2.95 2.95 0 0 1 9 12c0-.27.03-.53.09-.76l-1.35-1.35zm4.22 4.22-1.59-1.59c.5.34 1.11.54 1.77.54a3 3 0 0 0 3-3c0-.66-.2-1.27-.54-1.77l1.59 1.59c.06.29.09.58.09.88a4.14 4.14 0 0 1-4.32 4.35zM12 6c7.83 0 11.1 6 11.1 6a11.8 11.8 0 0 1-3.47 3.88l-2.16-2.16c.47-.51.82-1.1 1.02-1.75-.76-1.6-2.7-4.19-6.49-4.19-.9 0-1.72.14-2.45.38L7.77 6.4A11.67 11.67 0 0 1 12 6z"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 7.5c-4.77 0-8.83 2.94-10.5 7.1 1.67 4.16 5.73 7.1 10.5 7.1s8.83-2.94 10.5-7.1c-1.67-4.16-5.73-7.1-10.5-7.1zm0 11.8a4.7 4.7 0 1 1 0-9.4 4.7 4.7 0 0 1 0 9.4z"
                    />
                    <circle cx="12" cy="14.6" r="2.5" fill="currentColor" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                className="checkbox-input"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                disabled={loading}
              />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

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

export default LoginView;
