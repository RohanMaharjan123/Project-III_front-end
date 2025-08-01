// contexts/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/lib/axios';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    role: 'admin' | 'user';
    date_joined: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
    register: (fullName: string, email: string, password: string, role: 'admin' | 'user') => Promise<void>;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const token = Cookies.get('access_token');
        if (token) {
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfile = async () => {
        try {
            // The api instance automatically adds the auth token.
            const response = await api.get(`/auth/profile/`);
            setUser(response.data);
        } catch (error) {
            // The interceptor in lib/axios.ts will handle token refresh.
            // If refresh fails, it will redirect to /login.
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, rememberMe = false) => {
        const response = await api.post(`/auth/login/`, { email, password });
        const { user, access, refresh } = response.data;

        const accessCookieOptions = rememberMe ? { expires: 1 } : undefined;
        const refreshCookieOptions = rememberMe ? { expires: 7 } : undefined;

        Cookies.set('access_token', access, accessCookieOptions);
        Cookies.set('refresh_token', refresh, refreshCookieOptions);

        setUser(user);
    };

    const register = async (fullName: string, email: string, password: string, role: 'admin' | 'user') => {
        const nameParts = fullName.trim().split(' ');
        const first_name = nameParts.shift() || '';
        const last_name = nameParts.join(' ');

        const response = await api.post(`/auth/register/`, {
            first_name,
            last_name,
            email,
            password,
            confirm_password: password,
            role,
        });
        const { user, access, refresh } = response.data;

        Cookies.set('access_token', access, { expires: 1 });
        Cookies.set('refresh_token', refresh, { expires: 7 });

        setUser(user);
    };

    const logout = () => {
        const refreshToken = Cookies.get('refresh_token');
        const logoutCall = refreshToken
            ? api.post(`/auth/logout/`, { refresh: refreshToken })
            : Promise.resolve();

        logoutCall
            .catch(error => {
                console.error('Server logout failed, but logging out client-side anyway:', error);
            })
            .finally(() => {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                setUser(null);
                router.push('/login');
            });
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};