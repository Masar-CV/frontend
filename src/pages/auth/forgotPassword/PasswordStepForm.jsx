const PasswordStepForm = ({
  newPassword,
  confirmPassword,
  loading,
  handleNewPasswordChange,
  handleConfirmPasswordChange,
  handleResetPassword,
}) => (
  <form onSubmit={handleResetPassword}>
    <div className="form-group">
      <label htmlFor="newPassword" className="form-label">
        New Password
      </label>
      <input
        id="newPassword"
        type="password"
        placeholder="Enter new password"
        className="form-input"
        value={newPassword}
        onChange={handleNewPasswordChange}
        disabled={loading}
        required
      />
      <small>Minimum 8 characters</small>
    </div>

    <div className="form-group">
      <label htmlFor="confirmPassword" className="form-label">
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        className="form-input"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        disabled={loading}
        required
      />
    </div>

    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading ? 'Resetting Password...' : 'Reset Password'}
    </button>
  </form>
);

export default PasswordStepForm;
