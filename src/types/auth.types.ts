// src/types/auth.types.ts (FINAL SIN ERRORES DE EXPORTACIÓN)
import { BaseEntity } from './common.types';

// ESTA ES LA DEFINICIÓN CORRECTA del Usuario
export interface User extends BaseEntity {
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    phone?: string;
    avatar_url?: string;
    is_host: boolean;
    is_verified: boolean;
}
export interface ResetPasswordData {
    new_password: string;
    confirm_password: string;
}
// 🛑 FIX: Interfaz de Respuesta del API para Login/Register
// Incluye todos los campos de token esperados por useAuth.ts
export interface AuthResponse {
    user: User;
    access_token: string;
    refresh_token: string;
    session_token: string;
}

// Interfaz de Sesión (usada en Context/State si fuera necesario)
export interface AuthSession {
    user: User;
    access_token: string;
    expires_at: string;
}

// Formularios
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    confirm_password: string;
}

// Estado global de autenticación
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}