import ForgotPasswordView from './ForgotPasswordView';
import useForgotPasswordController from './useForgotPasswordController';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const controller = useForgotPasswordController();
  return <ForgotPasswordView {...controller} />;
};

export default ForgotPassword;
