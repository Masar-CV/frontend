import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/routes/paths';
import authService from '../../../services/authService';
import errorHandler from '../../../utils/errorHandler';
import { SUCCESS_MESSAGES } from '../../../utils/constants';
import { validateLoginForm } from './loginValidation';

const DEFAULT_FORM_DATA = {
  email: '',
  password: '',
};

const useLoginController = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (!rememberedEmail) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      email: rememberedEmail,
    }));
    setRememberMe(true);
  }, []);

  const clearErrorIfNeeded = () => {
    if (error) {
      setError('');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearErrorIfNeeded();
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    const validationError = validateLoginForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await authService.login(formData.email, formData.password);

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      console.log(SUCCESS_MESSAGES.LOGIN_SUCCESS);
      navigate(ROUTES.home);
    } catch (err) {
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('Login Component', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    rememberMe,
    showPassword,
    loading,
    error,
    handleInputChange,
    handleRememberMeChange,
    handleTogglePasswordVisibility,
    handleLogin,
  };
};

export default useLoginController;
