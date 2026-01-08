import type { Dispatch, SetStateAction } from 'react';
type EditableUser = {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    age: number;
};

type EditFormData = {
    updatedName: string;
    updatedEmail: string;
    updatedPhone: string;
    updatedAge: string;
};

type EditUserModalProps = {
    isOpen: boolean;
    loading: boolean;
    message: string;
    editingUser: EditableUser | null;
    editFormData: EditFormData;
    setEditFormData: Dispatch<SetStateAction<EditFormData>>;
    onClose: () => void;
    onSubmit: () => void;
};

function EditUserModal({
    isOpen,
    loading,
    message,
    editingUser,
    editFormData,
    setEditFormData,
    onClose,
    onSubmit,
}: EditUserModalProps) {
    if (!isOpen || !editingUser) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full mx-4 border border-white/10">
                <h2 className="text-xl font-semibold text-white mb-6">Edit User</h2>

                {message && (
                    <div className={`mb-4 p-3 rounded-md text-sm overflow-hidden ${message.includes('successfully') ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                        <p className="whitespace-pre-wrap break-words">{message}</p>
                    </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="edit-name" className="block text-sm font-medium text-white mb-2">Name <span className="text-red-500">*</span></label>
                            <input
                                id="edit-name"
                                type="text"
                                value={editFormData.updatedName}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, updatedName: e.target.value }))}
                                required
                                className="w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="edit-email" className="block text-sm font-medium text-white mb-2">Email <span className="text-red-500">*</span></label>
                            <input
                                id="edit-email"
                                type="email"
                                value={editFormData.updatedEmail}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, updatedEmail: e.target.value }))}
                                required
                                className="w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="edit-phone" className="block text-sm font-medium text-white mb-2">Phone</label>
                            <input
                                id="edit-phone"
                                type="tel"
                                value={editFormData.updatedPhone}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, updatedPhone: e.target.value }))}
                                className="w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="edit-age" className="block text-sm font-medium text-white mb-2">Age <span className="text-red-500">*</span></label>
                            <input
                                id="edit-age"
                                type="number"
                                value={editFormData.updatedAge}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, updatedAge: e.target.value }))}
                                min="1"
                                max="120"
                                required
                                className="w-full rounded-md bg-white/5 px-3 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex gap-x-3 justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditUserModal;