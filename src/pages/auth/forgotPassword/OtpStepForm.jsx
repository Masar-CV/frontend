const OtpStepForm = ({
  otpCode,
  loading,
  handleOtpChange,
  handleVerifyOtp,
  handleBackToEmail,
}) => (
  <form onSubmit={handleVerifyOtp}>
    <div className="form-group">
      <label htmlFor="otp" className="form-label">
        OTP Code
      </label>
      <input
        id="otp"
        type="text"
        placeholder="Enter 6-digit OTP"
        className="form-input"
        value={otpCode}
        onChange={handleOtpChange}
        maxLength="6"
        disabled={loading}
        required
      />
      <small>Check your email for the 6-digit code</small>
    </div>

    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading ? 'Verifying OTP...' : 'Verify OTP'}
    </button>

    <button
      type="button"
      className="btn btn-secondary"
      onClick={handleBackToEmail}
      disabled={loading}
    >
      Back to Email
    </button>
  </form>
);

export default OtpStepForm;
