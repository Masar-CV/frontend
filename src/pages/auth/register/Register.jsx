import RegisterView from './RegisterView';
import useRegisterController from './useRegisterController';
import './Register.css';

const Register = () => {
  const controller = useRegisterController();
  return <RegisterView {...controller} />;
};

export default Register;

