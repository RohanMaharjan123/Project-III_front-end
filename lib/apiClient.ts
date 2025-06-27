import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

// Helper to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
    if (response.status === 204) {
        // No content to parse
        return null as T;
    }

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        // Handle 401 Unauthorized specifically
        if (response.status === 401) {
            // Clear cookies and redirect to login
            Cookies.remove("Access", { path: '/' });
            Cookies.remove("refresh", { path: '/' });
            Cookies.remove("role", { path: '/' });
            Cookies.remove("name", { path: '/' });
            // Use window.location to force a full page reload to clear all state
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
            // Throw a specific error to stop further processing
            throw new Error('Unauthorized');
        }

        // For other errors, extract detail from JSON or use status text
        const error = (isJson && (data.detail || data.error || JSON.stringify(data))) || response.statusText;
        return Promise.reject(new Error(error));
    }

    return data as T;
}

// Function to get authorization headers
function getAuthHeaders(): HeadersInit {
    const token = Cookies.get('Access');
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

// Generic function for making API requests
async function request<T>(endpoint: string, options: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, options);
    return handleResponse<T>(response);
}

// GET request
export async function getJson<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    return request<T>(endpoint, {
        ...options,
        method: 'GET',
        headers: getAuthHeaders(),
    });
}

// POST, PUT, PATCH, DELETE requests with JSON body
export async function sendJson<T>(endpoint:string, method: 'POST' | 'PUT' | 'PATCH' | 'DELETE', body: any, options: RequestInit = {}): Promise<T> {
    return request<T>(endpoint, {
        ...options,
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(body),
    });
}

