import { useState } from 'react';
import { userService, type RegisterUserData } from '../services/userService';

function BUEForm() {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', age: '' });
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

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-white/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-white">Personal Information</h2>
                        <p className="mt-1 text-sm/6 text-gray-400">Use a permanent address where you can receive mail.</p>

                        {message && (
                            <div className={`mt-4 p-4 rounded-md text-sm overflow-hidden ${message.includes('successful') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                                <p className="whitespace-pre-wrap break-words">{message}</p>
                            </div>
                        )}

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-9">
                                <label htmlFor="name" className="block text-sm/6 font-medium text-white">Name <span className="text-red-500">*</span></label>
                                <div className="mt-2">
                                    <input id="name" type="text" name="name" value={formData.name} onChange={handleChange} autoComplete="name" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="sm:col-span-9">
                                <label htmlFor="email" className="block text-sm/6 font-medium text-white">Email address <span className="text-red-500">*</span></label>
                                <div className="mt-2">
                                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} autoComplete="email" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="phone" className="block text-sm/6 font-medium text-white">Phone number</label>
                                <div className="mt-2">
                                    <input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} autoComplete="tel" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="age" className="block text-sm/6 font-medium text-white">Age <span className="text-red-500">*</span></label>
                                <div className="mt-3">
                                    <input id="age" type="number" name="age" value={formData.age} onChange={handleChange} min="1" max="120" required className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-white">Cancel</button>
                    <button type="submit" disabled={loading} className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">{loading ? 'Saving...' : 'Save'}</button>
                </div>
            </form>

        </>
    )
}

export default BUEForm
