import { useState, useEffect } from 'react';
import { userService, type User, type UpdateUserData } from '../services/userService';
import { useLanguage } from '../contexts/LanguageContext';

interface EditFormData {
    updatedName: string;
    updatedEmail: string;
    updatedPhone: string;
    updatedAge: string;
}

export const useUsers = () => {
    const { t } = useLanguage();
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editFormData, setEditFormData] = useState<EditFormData>({
        updatedName: '',
        updatedEmail: '',
        updatedPhone: '',
        updatedAge: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleError = (error: any) => {
        console.error('API Error:', error);
        return error?.message || 'Unable to connect to the server.';
    };

    const fetchUsers = async () => {
        setLoading(true);
        setMessage('');

        try {
            const data = await userService.fetchAllUsers();
            setUsers(data);
            setIsSearching(false);
        } catch (error) {
            setMessage(`${handleError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const searchUserByEmail = async () => {
        if (!searchQuery.trim()) {
            setMessage('Please enter an email to search.');
            return;
        }

        setLoading(true);
        setMessage('');
        setIsSearching(true);

        try {
            const data = await userService.searchUserByEmail(searchQuery);
            setUsers(data);
        } catch (error: any) {
                setMessage(`${handleError(error)}`);
                setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        setMessage('');
        fetchUsers();
    };

    const deleteUser = async (id: number, email: string) => {
        if (!window.confirm(t('confirmDelete', { email }))) {
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            await userService.deleteUser(id);
            fetchUsers();
            setMessage(t('userDeletedSuccessfully', { email }));
        } catch (error) {
            setMessage(`${handleError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (user: User) => {
        setEditingUser(user);
        setEditFormData({
            updatedName: user.name,
            updatedEmail: user.email,
            updatedPhone: user.phone || '',
            updatedAge: user.age.toString()
        });
    };

    const closeEditModal = () => {
        setEditingUser(null);
        setEditFormData({
            updatedName: '',
            updatedEmail: '',
            updatedPhone: '',
            updatedAge: ''
        });
    };

    const updateUser = async () => {
        if (!editingUser) return;

        setLoading(true);
        setMessage('');

        try {
            const userData: UpdateUserData = {
                id: editingUser.id,
                updatedName: editFormData.updatedName || null,
                updatedEmail: editFormData.updatedEmail || null,
                updatedPhone: editFormData.updatedPhone,
                updatedAge: editFormData.updatedAge ? parseInt(editFormData.updatedAge) : null
            };

            await userService.updateUser(userData);
            setMessage(t('userUpdatedSuccessfully'));
            closeEditModal();
            fetchUsers();
        } catch (error) {
            setMessage(`${handleError(error)}`);
        } finally {
            setLoading(false);
        }
    };

    return {
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
    };
};
