import { useState } from 'react';
import { userService, type RegisterUserData } from '../services/userService';
import { useLanguage } from '../contexts/LanguageContext';

function BUEForm() {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', age: '' });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const mapError = (error: any) => {
        return error?.message || t('couldNotComplete');
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
            setMessage(t('registrationSuccessful'));
            setFormData({ name: '', email: '', phone: '', age: '' });
        } catch (err) {
            setMessage(mapError(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-white">{t('personalInformation')}</h2>
                        <p className="mt-1 text-sm/6 text-gray-400">{t('usePermAddress')}</p>

                        {message && (
                            <div className={`mt-4 p-4 rounded-md text-sm overflow-hidden ${message.includes('successful') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                                <p className="whitespace-pre-wrap break-words">{message}</p>
                            </div>
                        )}

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-9">
                                <label htmlFor="name" className="label">{t('name')} <span className="text-red-500">*</span></label>
                                <div className="mt-2">
                                    <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" required className="input" />
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                                <label htmlFor="email" className="label">{t('emailAddress')} <span className="text-red-500">*</span></label>
                                <div className="mt-2">
                                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" required className="input" />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="phone" className="label">{t('phoneNumber')}</label>
                                <div className="mt-2">
                                    <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="input" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="age" className="label">{t('age')} <span className="text-red-500">*</span></label>
                                <div className="mt-3">
                                    <input id="age" type="number" name="age" value={formData.age} onChange={handleChange} min="1" max="120" required className="input" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" onClick={() => setFormData({ name: '', email: '', phone: '', age: '' })} className="text-sm/6 font-semibold text-white">{t('clear')}</button>
                    <button type="submit" disabled={loading} className="btn-base btn-primary btn-sm">{loading ? t('saving') : t('save')}</button>
                </div>
            </form>

        </>
    )
}

export default BUEForm
