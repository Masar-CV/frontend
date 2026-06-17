import { Link } from 'react-router-dom';
import { ROUTES } from '../../../app/routes/paths';
import cvImage from '../../../assets/images/cv.svg';

const RegisterView = ({
  formData,
  termsAccepted,
  loading,
  error,
  handleInputChange,
  handleTermsChange,
  handleRegister,
}) => (
  <div className="register-page">
    <div className="register-left">
      <div className="register-left-content">
        <h1 className="register-title">
          Build Your Future,
          <br /> Today
        </h1>
      </div>
      <img src={cvImage} alt="Resume" className="register-resume-image" />
    </div>

    <div className="register-right">
      <div className="register-form-container">
        <div className="register-header">
          <h2 className="register-heading">Get started now</h2>
          <p className="register-subheading">
            Enter your credential to get started now.
          </p>
        </div>

        <form className="register-form" onSubmit={handleRegister}>
          {error && <div className="form-error">{error}</div>}

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

          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={termsAccepted}
              onChange={handleTermsChange}
              disabled={loading}
            />
            <span>
              I agree to the{' '}
              <Link to={ROUTES.terms} className="terms-link">
                Terms & Privacy
              </Link>
            </span>
          </label>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="form-footer">
            Have an account ?{' '}
            <Link to={ROUTES.login} className="form-link">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default RegisterView;
