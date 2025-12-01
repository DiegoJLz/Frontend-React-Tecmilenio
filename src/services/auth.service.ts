// src/services/auth.service.ts (FINAL CON resetPassword)
import { apiClient } from '../lib/api';
// Importamos ResetPasswordData y otros tipos
import { LoginCredentials, RegisterData, User, AuthResponse, ResetPasswordData } from '../types'; 

interface RefreshTokenResponse {
    access_token: string;
}

export class AuthService {
    private static readonly baseUrl = '/auth'; 

    static async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(`${this.baseUrl}/login`, credentials);
        return response.data;
    }

    static async register(data: RegisterData): Promise<AuthResponse> {
        const response = await apiClient.post<AuthResponse>(`${this.baseUrl}/register`, data);
        return response.data;
    }

    static async getCurrentUser(): Promise<User> {
        const response = await apiClient.get<User>(`${this.baseUrl}/me`); 
        return response.data;
    }

    static async refreshToken(): Promise<RefreshTokenResponse> {
        const response = await apiClient.post<RefreshTokenResponse>(`${this.baseUrl}/refresh`, {}); 
        return response.data;
    }

    static async logout(sessionToken: string): Promise<void> {
        await apiClient.post(`${this.baseUrl}/logout`, { session_token: sessionToken });
    }

    // 🛑 FIX FINAL: Implementamos resetPassword (Resuelve error 2339)
    static async resetPassword(token: string, newPassword: string, confirmPassword: string): Promise<User> {
        const resetData: ResetPasswordData = { new_password: newPassword, confirm_password: confirmPassword };
        
        // El endpoint requiere el token en Query Params
        // POST /auth/reset-password?token=JWT_TOKEN_AQUI
        const response = await apiClient.post<User>(`${this.baseUrl}/reset-password?token=${token}`, resetData);
        
        // Nota: Asumimos que la respuesta exitosa devuelve el objeto User
        return response.data; 
    }
}