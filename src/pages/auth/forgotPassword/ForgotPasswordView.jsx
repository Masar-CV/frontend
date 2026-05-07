import { Link } from 'react-router-dom';
import cvImage from '../../../assets/images/cv.svg';
import EmailStepForm from './EmailStepForm';
import OtpStepForm from './OtpStepForm';
import PasswordStepForm from './PasswordStepForm';

const ForgotPasswordView = ({
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
}) => (
  <div className="forgot-password-page">
    <div className="forgot-password-left">
      <div className="forgot-password-left-content">
        <h1 className="forgot-password-title">
          Reset Your
          <br /> Password
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
          <h2 className="forgot-password-heading">Forgot Password</h2>
          <p className="forgot-password-subheading">{subheading}</p>
        </div>

        {successMessage && <div className="form-success">{successMessage}</div>}
        {error && <div className="form-error">{error}</div>}

        {step === 'email' && (
          <EmailStepForm
            email={email}
            loading={loading}
            handleEmailChange={handleEmailChange}
            handleRequestOtp={handleRequestOtp}
          />
        )}

        {step === 'otp' && (
          <OtpStepForm
            otpCode={otpCode}
            loading={loading}
            handleOtpChange={handleOtpChange}
            handleVerifyOtp={handleVerifyOtp}
            handleBackToEmail={handleBackToEmail}
          />
        )}

        {step === 'password' && (
          <PasswordStepForm
            newPassword={newPassword}
            confirmPassword={confirmPassword}
            loading={loading}
            handleNewPasswordChange={handleNewPasswordChange}
            handleConfirmPasswordChange={handleConfirmPasswordChange}
            handleResetPassword={handleResetPassword}
          />
        )}

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

export default ForgotPasswordView;
