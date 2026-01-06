import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    age: number;
}

function UsersTable() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('https://localhost:7009/api/User/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
            });

            if (response.status === 200) {
                const data = await response.json();
                setUsers(data);
            } else if (response.status === 500) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message || 'An error occurred on the server.';
                setMessage(`Server error: ${errorMessage}`);
            } else {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message || `Unexpected error: ${response.status} ${response.statusText}`;
                setMessage(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Fetch users error:', error);
            let errorMessage = 'Unable to connect to the server.';
            setMessage(`Error: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-base/7 font-semibold text-white">Users List</h2>
                            <p className="mt-1 text-sm/6 text-gray-400">Displaying all registered users.</p>
                        </div>
                        <button
                            onClick={fetchUsers}
                            disabled={loading}
                            className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Loading...' : 'Refresh'}
                        </button>
                    </div>

                    {message && (
                        <div className={`mt-4 p-4 rounded-md text-sm overflow-hidden ${message.includes('successful') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                            <p className="whitespace-pre-wrap break-words">{message}</p>
                        </div>
                    )}

                    {loading ? (
                        <div className="mt-10 text-center text-gray-400">
                            <p>Loading users...</p>
                        </div>
                    ) : users.length === 0 ? (
                        <div className="mt-10 text-center text-gray-400">
                            <p>No users found.</p>
                        </div>
                    ) : (
                        <div className="mt-8 overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-white">ID</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-white">Name</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-white">Email</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-white">Phone</th>
                                        <th className="text-left px-4 py-3 text-sm font-semibold text-white">Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                            <td className="px-4 py-3 text-sm text-gray-300">{user.id}</td>
                                            <td className="px-4 py-3 text-sm text-gray-300">{user.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-300">{user.email}</td>
                                            <td className="px-4 py-3 text-sm text-gray-300">{user.phone || '-'}</td>
                                            <td className="px-4 py-3 text-sm text-gray-300">{user.age}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default UsersTable
