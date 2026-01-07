import EditUserModal from '../components/EditUserModal';
import { useUsers } from '../hooks/useUsers';

function UsersTable() {
    const {
        users,
        searchQuery,
        setSearchQuery,
        loading,
        message,
        isSearching,
        editingUser,
        editFormData,
        setEditFormData,
        fetchUsers,
        searchUserByEmail,
        handleClearSearch,
        deleteUser,
        openEditModal,
        closeEditModal,
        updateUser
    } = useUsers();

    return (
        <>
            <div className="space-y-12">
                <div className="border-b border-white/10 pb-12">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-base/7 font-semibold text-white">Users List</h2>
                            <p className="mt-1 text-sm/6 text-gray-400">{isSearching ? 'Search results' : 'Displaying all registered users.'}</p>
                        </div>
                        <button
                            onClick={fetchUsers}
                            disabled={loading}
                            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600"
                        >
                            {loading ? 'Loading...' : 'Refresh'}
                        </button>
                    </div>

                    <div className="mt-6 flex gap-x-3">
                        <input
                            type="email"
                            placeholder="Search by email..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchUserByEmail()}
                            className="flex-1 rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                        />
                        <button
                            onClick={searchUserByEmail}
                            disabled={loading}
                            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600"
                        >
                            Search
                        </button>
                        {isSearching && (
                            <button
                                onClick={handleClearSearch}
                                disabled={loading}
                                className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-600"
                            >
                                Clear
                            </button>
                        )}
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
                                        <th className="text-left px-6 py-4 text-base font-semibold text-white">ID</th>
                                        <th className="text-left px-6 py-4 text-base font-semibold text-white">Name</th>
                                        <th className="text-left px-6 py-4 text-base font-semibold text-white">Email</th>
                                        <th className="text-left px-6 py-4 text-base font-semibold text-white">Phone</th>
                                        <th className="text-left px-6 py-4 text-base font-semibold text-white">Age</th>
                                        <th className="text-left px-6 py-4 text-base font-semibold text-white">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                            <td className="px-6 py-4 text-base text-gray-300">{user.id}</td>
                                            <td className="px-6 py-4 text-base text-gray-300">{user.name}</td>
                                            <td className="px-6 py-4 text-base text-gray-300">{user.email}</td>
                                            <td className="px-6 py-4 text-base text-gray-300">{user.phone || '-'}</td>
                                            <td className="px-6 py-4 text-base text-gray-300">{user.age}</td>
                                            <td className="px-6 py-4 text-base flex gap-x-2">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    disabled={loading}
                                                    className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"

                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.id, user.email)}
                                                    disabled={loading}
                                                    className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <EditUserModal
                isOpen={!!editingUser}
                editingUser={editingUser}
                editFormData={editFormData}
                setEditFormData={setEditFormData}
                loading={loading}
                message={message}
                onClose={closeEditModal}
                onSubmit={updateUser}
            />
        </>
    )
}

export default UsersTable
