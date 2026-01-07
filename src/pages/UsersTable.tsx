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
                            className="btn-base btn-primary"
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
                            className="btn-base btn-primary"
                        >
                            Search
                        </button>
                        {isSearching && (
                            <button
                                onClick={handleClearSearch}
                                disabled={loading}
                                className="btn-base btn-primary"
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
                                        <th className="th-cell">ID</th>
                                        <th className="th-cell">Name</th>
                                        <th className="th-cell">Email</th>
                                        <th className="th-cell">Phone</th>
                                        <th className="th-cell">Age</th>
                                        <th className="th-cell">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                                            <td className="td-cell">{user.id}</td>
                                            <td className="td-cell">{user.name}</td>
                                            <td className="td-cell">{user.email}</td>
                                            <td className="td-cell">{user.phone || '-'}</td>
                                            <td className="td-cell">{user.age}</td>
                                            <td className="td-actions">
                                                <button
                                                    onClick={() => openEditModal(user)}
                                                    disabled={loading}
                                                    className="btn-base btn-edit"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteUser(user.id, user.email)}
                                                    disabled={loading}
                                                    className="btn-base btn-gray"
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
