import { useState } from 'react';
import { userService, type RegisterUserData } from '../services/userService';

interface FormState {
  name: string;
  email: string;
  phone: string;
  age: string; // keep as string for input control
}

export const useRegistrationForm = () => {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', phone: '', age: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const mapError = (error: any) => {
    return error?.message || 'Unable to connect to the server.';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload: RegisterUserData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        age: formData.age ? parseInt(formData.age) : 0,
      };

      await userService.registerUser(payload);
      setMessage('Registration successful!');
      setFormData({ name: '', email: '', phone: '', age: '' });
    } catch (err) {
      setMessage(mapError(err));
    } finally {
      setLoading(false);
    }
  };

  return { formData, setFormData, loading, message, setMessage, handleChange, handleSubmit };
};
