// Authentication hook
import { useState, useEffect, useCallback } from 'react';
import { User, LoginCredentials, RegisterData } from '../types';
import { AuthService } from '../services';
import { apiClient } from '../lib/api';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth token from localStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      apiClient.setAuthToken(token);
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
      // Clear invalid token
      localStorage.removeItem('auth_token');
      apiClient.removeAuthToken();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      const user = await AuthService.login(credentials);
      setUser(user);

      // Store token if provided
      if (user.token) {
        localStorage.setItem('auth_token', user.token);
        apiClient.setAuthToken(user.token);
      }

      return user;
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
      const user = await AuthService.register(data);
      setUser(user);

      // Store token if provided
      if (user.token) {
        localStorage.setItem('auth_token', user.token);
        apiClient.setAuthToken(user.token);
      }

      return user;
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
      await AuthService.logout();
      setUser(null);
      localStorage.removeItem('auth_token');
      apiClient.removeAuthToken();
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    }
  };

  const refreshToken = async () => {
    try {
      const tokens = await AuthService.refreshToken();
      localStorage.setItem('auth_token', tokens.token);
      apiClient.setAuthToken(tokens.token);
      return tokens;
    } catch (err: any) {
      setError(err.message || 'Token refresh failed');
      throw err;
    }
  };

  const clearError = () => setError(null);

  return {
    user,
    isLoading,
    error,
    login,
    register,
    logout,
    refreshToken,
    clearError,
    isAuthenticated: !!user,
  };
};
