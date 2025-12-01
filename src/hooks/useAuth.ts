// src/hooks/useAuth.ts (FINAL SIN ERRORES)
import { useState, useEffect, useCallback, useMemo } from 'react';
// Importamos los tipos necesarios
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types'; 
import { AuthService } from '../services'; 
import { apiClient } from '../lib/api';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sessionToken, setSessionToken] = useState<string | null>(null);

    // Initialize auth token and session token from localStorage
    useEffect(() => {
        const authToken = localStorage.getItem('auth_token');
        const storedSessionToken = localStorage.getItem('session_token'); 
        
        if (authToken) {
            apiClient.setAuthToken(authToken);
        }
        if (storedSessionToken) {
            setSessionToken(storedSessionToken);
        }
    }, []);

    const checkAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const currentUser = await AuthService.getCurrentUser();
            setUser(currentUser);
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
            setUser(null);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('session_token');
            apiClient.removeAuthToken();
            setSessionToken(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (localStorage.getItem('auth_token')) {
             checkAuth();
        } else {
             setIsLoading(false);
        }
    }, [checkAuth]);

    const login = async (credentials: LoginCredentials) => {
        try {
            setIsLoading(true);
            setError(null);
            
            // Ya no hay error: AuthService.login devuelve AuthResponse
            const response: AuthResponse = await AuthService.login(credentials); 
            
            setUser(response.user);

            localStorage.setItem('auth_token', response.access_token);
            localStorage.setItem('session_token', response.session_token); 
            apiClient.setAuthToken(response.access_token);
            setSessionToken(response.session_token);

            return response.user;
        } catch (err: any) {
            const errorMessage = err.message || 'Login failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (data: RegisterData) => {
        try {
            setIsLoading(true);
            setError(null);
            const response: AuthResponse = await AuthService.register(data); 
            
            setUser(response.user);

            localStorage.setItem('auth_token', response.access_token);
            localStorage.setItem('session_token', response.session_token); 
            apiClient.setAuthToken(response.access_token);
            setSessionToken(response.session_token);
            
            return response.user;
        } catch (err: any) {
            const errorMessage = err.message || 'Registration failed';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            // Llama a logout con el token de sesión
            if (sessionToken) {
                await AuthService.logout(sessionToken); 
            }
            
            setUser(null);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('session_token');
            apiClient.removeAuthToken();
            setSessionToken(null);
        } catch (err: any) {
            setError(err.message || 'Logout failed');
        }
    };

    const refreshToken = async () => {
        try {
            const tokens = await AuthService.refreshToken(); 
            localStorage.setItem('auth_token', tokens.access_token);
            apiClient.setAuthToken(tokens.access_token);
            return tokens;
        } catch (err: any) {
            setError(err.message || 'Token refresh failed');
            throw err;
        }
    };

    const clearError = () => setError(null);

    return useMemo(() => ({
        user,
        isLoading,
        error,
        login,
        register,
        logout,
        refreshToken,
        clearError,
        isAuthenticated: !!user,
    }), [user, isLoading, error]);
};