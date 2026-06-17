import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../app/routes/paths';
import authService from '../../../services/authService';
import errorHandler from '../../../utils/errorHandler';
import { SUCCESS_MESSAGES, USER_ROLES } from '../../../utils/constants';
import { validateRegisterForm } from './registerValidation';

const DEFAULT_FORM_DATA = {
  fullName: '',
  email: '',
  password: '',
  role: USER_ROLES.STUDENT,
};

const useRegisterController = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleTermsChange = (event) => {
    setTermsAccepted(event.target.checked);
    clearErrorIfNeeded();
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');

    const validationError = validateRegisterForm({ formData, termsAccepted });
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      console.log(SUCCESS_MESSAGES.REGISTER_SUCCESS);
      navigate(ROUTES.home);
    } catch (err) {
      const userMessage = errorHandler.getUiMessage(err);
      setError(userMessage);
      errorHandler.logError('Register Component', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    termsAccepted,
    loading,
    error,
    handleInputChange,
    handleTermsChange,
    handleRegister,
  };
};

export default useRegisterController;
