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
    if (error?.status) {
      switch (error.status) {
        case 400:
          if (error.data?.errors) {
            const msg = Object.entries(error.data.errors)
              .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(', ')}`)
              .join('\n');
            return `Validation errors:\n${msg}`;
          }
          return `Validation error: ${error.message}`;
        case 409:
          return `Error: ${error.message || 'User already exists.'}`;
        case 500:
          return `Server error: ${error.message}`;
        default:
          return `Error: ${error.message}`;
      }
    }
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
