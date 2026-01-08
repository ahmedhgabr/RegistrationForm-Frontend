const API_BASE_URL = 'https://localhost:7009/api/User';

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    age: number;
}

export interface UpdateUserData {
    id: number;
    updatedName: string | null;
    updatedEmail: string | null;
    updatedPhone: string | null;
    updatedAge: number | null;
}

export interface RegisterUserData {
    name: string;
    email: string;
    phone: string | null;
    age: number;
}

class UserService {
    private async handleResponse<T>(response: Response): Promise<T> {
        if (response.status === 204) {
            return null as T;
        }

        const contentType = response.headers.get('content-type');
        const hasJson = contentType?.includes('application/json');

        if (response.ok) {
            return hasJson ? await response.json() : (null as T);
        }

        // Handle errors
        let errorData = null;
        if (hasJson) {
            errorData = await response.json().catch(() => null);
        }

        const errorMessage = this.mapErrorMessage(response.status, errorData);

        throw {
            status: response.status,
            message: errorMessage,
            data: errorData
        };
    }

    private mapErrorMessage(status: number, data: any): string {
        switch (status) {
            case 400:
                if (data?.errors) {
                    const errorMessages = Object.entries(data.errors)
                        .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(', ')}`)
                        .join('\n');
                    return `Validation errors:\n${errorMessages}`;
                }
                return `Validation error: ${JSON.stringify(data)}  ${data?.message || 'Invalid request'}`;
            case 404:
                return  data?.message || 'User not found.';
            case 409:
                return data?.message || 'This record already exists.';
            case 500:
                return `Server error: ${data?.message || 'An error occurred on the server.'}`;
            default:
                return data?.message || data?.Message || `Error: ${status}`;
        }
    }

    async fetchAllUsers(): Promise<User[]> {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });

        return this.handleResponse<User[]>(response);
    }

    async searchUserByEmail(email: string): Promise<User[]> {
        const response = await fetch(`${API_BASE_URL}/email/${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });

        return this.handleResponse<User[]>(response);
    }

    async deleteUser(id: number): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/delete/${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
        });

        return this.handleResponse<void>(response);
    }

    async updateUser(userData: UpdateUserData): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            mode: 'cors',
        });

        return this.handleResponse<void>(response);
    }

    async registerUser(userData: RegisterUserData): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
            mode: 'cors',
        });

        return this.handleResponse<void>(response);
    }
}

export const userService = new UserService();
