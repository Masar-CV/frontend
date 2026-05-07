const EmailStepForm = ({ email, loading, handleEmailChange, handleRequestOtp }) => (
  <form onSubmit={handleRequestOtp}>
    <div className="form-group">
      <label htmlFor="email" className="form-label">
        Email Address
      </label>
      <input
        id="email"
        type="email"
        placeholder="Enter your email"
        className="form-input"
        value={email}
        onChange={handleEmailChange}
        disabled={loading}
        required
      />
    </div>

    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading ? 'Sending OTP...' : 'Send OTP'}
    </button>
  </form>
);

export default EmailStepForm;
