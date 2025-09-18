// Authentication service
import { apiClient } from '../lib/api';
import { User, LoginCredentials, RegisterData } from '../types';

export class AuthService {
  private static readonly baseUrl = '/api/v1/auth';

  static async login(credentials: LoginCredentials): Promise<User> {
    try {
      console.log('🚀 AuthService.login - Logging in user:', credentials.email);

      const response = await fetch('/api/backend/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('📡 AuthService.login - Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AuthService.login - Error response:', errorText);

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          }
        } catch (parseError) {
          // If not JSON, use the raw error text
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ AuthService.login - Success:', result);

      // Handle different response formats
      if (result.success !== undefined) {
        return result.data;
      } else {
        return result;
      }
    } catch (error) {
      console.error('❌ AuthService.login - Error:', error);
      throw error;
    }
  }

  static async register(data: RegisterData): Promise<User> {
    try {
      console.log('🚀 AuthService.register - Sending data:', data);

      // Use Next.js proxy to avoid CORS issues
      const response = await fetch('/api/backend/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('📡 AuthService.register - Response status:', response.status);
      console.log('📡 AuthService.register - Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AuthService.register - Error response:', errorText);

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          }
        } catch (parseError) {
          // If not JSON, use the raw error text
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ AuthService.register - Success:', result);

      // Handle different response formats
      if (result.success !== undefined) {
        return result.data;
      } else {
        return result;
      }
    } catch (error) {
      console.error('❌ AuthService.register - Error:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    await apiClient.post(`${this.baseUrl}/logout`);
  }

  static async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<User>(`${this.baseUrl}/me`);
    return response.data;
  }

  static async refreshToken(): Promise<{ token: string; refreshToken: string }> {
    const response = await apiClient.post<{ token: string; refreshToken: string }>(
      `${this.baseUrl}/refresh`
    );
    return response.data;
  }

  static async forgotPassword(email: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/forgot-password`, { email });
  }

  static async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post(`${this.baseUrl}/reset-password`, { token, password });
  }

  static async verifyEmail(token: string): Promise<void> {
    try {
      console.log('🚀 AuthService.verifyEmail - Verifying email with token:', token.substring(0, 20) + '...');

      // Use GET request with token as query parameter
      const response = await fetch(`/api/backend/v1/auth/verify-email?token=${encodeURIComponent(token)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 AuthService.verifyEmail - Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AuthService.verifyEmail - Error response:', errorText);

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          }
        } catch (parseError) {
          // If not JSON, use the raw error text
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ AuthService.verifyEmail - Success:', result);
    } catch (error) {
      console.error('❌ AuthService.verifyEmail - Error:', error);
      throw error;
    }
  }

  static async resendVerificationEmail(email: string): Promise<void> {
    try {
      console.log('🚀 AuthService.resendVerificationEmail - Resending to:', email);

      const response = await fetch('/api/backend/v1/auth/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📡 AuthService.resendVerificationEmail - Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AuthService.resendVerificationEmail - Error response:', errorText);

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          }
        } catch (parseError) {
          // If not JSON, use the raw error text
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ AuthService.resendVerificationEmail - Success:', result);
    } catch (error) {
      console.error('❌ AuthService.resendVerificationEmail - Error:', error);
      throw error;
    }
  }

  static async forgotPassword(email: string): Promise<void> {
    try {
      console.log('🔄 AuthService.forgotPassword - Sending password reset email to:', email);

      const response = await fetch('/api/backend/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('📡 AuthService.forgotPassword - Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AuthService.forgotPassword - Error response:', errorText);

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          }
        } catch (parseError) {
          // If not JSON, use the raw error text
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ AuthService.forgotPassword - Success:', result);
    } catch (error) {
      console.error('❌ AuthService.forgotPassword - Error:', error);
      throw error;
    }
  }

  static async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<void> {
    try {
      console.log('🔄 AuthService.resetPassword - Resetting password with token:', token.substring(0, 20) + '...');

      const response = await fetch(`/api/backend/v1/auth/reset-password?token=${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          new_password: newPassword,
          confirm_password: confirmPassword
        }),
      });

      console.log('📡 AuthService.resetPassword - Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ AuthService.resetPassword - Error response:', errorText);

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error && errorData.error.message) {
            throw new Error(errorData.error.message);
          }
        } catch (parseError) {
          // If not JSON, use the raw error text
        }

        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('✅ AuthService.resetPassword - Success:', result);
    } catch (error) {
      console.error('❌ AuthService.resetPassword - Error:', error);
      throw error;
    }
  }
}
