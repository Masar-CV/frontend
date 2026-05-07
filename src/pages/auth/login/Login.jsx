import LoginView from './LoginView';
import useLoginController from './useLoginController';
import './Login.css';

const Login = () => {
  const controller = useLoginController();
  return <LoginView {...controller} />;
};

export default Login;

