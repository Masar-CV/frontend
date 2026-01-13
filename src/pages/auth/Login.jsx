import { Link } from 'react-router-dom';
import cvImage from '../../assets/images/cv.svg';
import './Login.css';

const Login = () => {
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

          <form className="login-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="form-input"
              />
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  className="checkbox-input"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary">
              Login
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
};

export default Login;

