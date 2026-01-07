export interface ApiErrorShape {
    status?: number;
    message?: string;
    data?: any;
}

export const mapApiError = (error: ApiErrorShape | any): string => {
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
            case 404:
                return error.message || 'Not found.';
            case 409:
                return `Error: ${error.message || 'Conflict.'}`;
            case 500:
                return `Server error: ${error.message}`;
            default:
                return `Error: ${error.message}`;
        }
    }

    if (error instanceof TypeError) {
        if (error.message.includes('Failed to fetch')) {
            return 'Connection failed. Make sure the server is running.';
        }
        if (error.message.includes('CORS')) {
            return 'CORS error: Your backend needs to allow requests from http://localhost:5173.';
        }
    }

    return error?.message || 'Unable to connect to the server.';
};
