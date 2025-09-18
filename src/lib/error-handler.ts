// Error handling utilities
import { ApiError } from './api';

export const handleApiError = (error: any): string => {
  if (error?.message) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

export const getErrorMessage = (error: any): string => {
  if (error?.errors) {
    // Handle validation errors
    const firstError = Object.values(error.errors)[0];
    if (Array.isArray(firstError) && firstError.length > 0) {
      return firstError[0];
    }
  }

  return handleApiError(error);
};

export const isNetworkError = (error: any): boolean => {
  return error?.status === 0 || error?.message?.includes('Network error');
};

export const isAuthError = (error: any): boolean => {
  return error?.status === 401 || error?.status === 403;
};

export const isValidationError = (error: any): boolean => {
  return error?.status === 422 || error?.status === 400;
};

export const isServerError = (error: any): boolean => {
  return error?.status >= 500;
};

export const getErrorStatus = (error: any): number => {
  return error?.status || 0;
};

export const logError = (error: any, context?: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'API Error'}]:`, error);
  }
};
