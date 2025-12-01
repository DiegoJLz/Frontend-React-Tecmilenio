// API Client for Rust backend
import { config } from './config'; // Importamos tu configuración global

export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  credentials?: RequestCredentials;
}

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    // Usamos la configuración para obtener la URL base
    const base = config.api.baseUrl.endsWith('/api/v1') 
        ? config.api.baseUrl 
        : `${config.api.baseUrl}/api/v1`;
        
    this.baseUrl = base;
    
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type');

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      let errors: Record<string, string[]> | undefined;

      if (contentType?.includes('application/json')) {
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
          errors = errorData.errors;
        } catch {
          // Fallback to status text if JSON parsing fails
        }
      }

      const error: ApiError = {
        message: errorMessage,
        status: response.status,
        errors,
      };

      throw error;
    }

    // Handle empty responses (like 204 No Content)
    if (response.status === 204 || !contentType?.includes('application/json')) {
      return {
        data: {} as T,
        message: 'Success',
        success: true,
        status: response.status,
      };
    }

    try {
      const data = await response.json();

      // Backend returns { success, data, message } format
      return {
        data: data.data || data, 
        message: data.message || 'Success',
        success: data.success ?? true, 
        status: response.status,
      };
    } catch (parseError) {
      const error: ApiError = {
        message: 'Failed to parse response',
        status: response.status,
      };
      throw error;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestConfig = {} // <-- FIX: Renombrado a 'options'
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      credentials = 'include',
    } = options; // <-- Usamos 'options'

    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

    const requestConfig: RequestInit = {
      method,
      credentials,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
      // FIX: Ahora usa el 'config' global importado, sin conflicto de nombres.
      signal: AbortSignal.timeout(config.api.timeout), 
    };

    if (body && method !== 'GET') {
      if (body instanceof FormData) {
        delete (requestConfig.headers as Record<string, string>)['Content-Type'];
        requestConfig.body = body;
      } else {
        requestConfig.body = JSON.stringify(body);
      }
    }

    try {
      const response = await fetch(url, requestConfig);
      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'TimeoutError') {
         throw { message: 'Request timed out.', status: 408 } as ApiError;
      }
      
      console.error('❌ Request failed:', error);
      
      const isNetworkError = error instanceof TypeError || (error as Error).message.includes('fetch');
      if (isNetworkError) {
        throw { 
          message: 'Error de red: No se pudo conectar con el servidor API. Revisa que el backend esté activo.', 
          status: 0 
        } as ApiError;
      }

      throw error; 
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', headers });
  }

  async post<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  async put<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  async patch<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body, headers });
  }

  async delete<T>(endpoint: string, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }

  // File upload method
  async upload<T>(
    endpoint: string,
    formData: FormData,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body: formData, headers });
  }

  // Set authorization token
  setAuthToken(token: string): void {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  // Remove authorization token
  removeAuthToken(): void {
    delete this.defaultHeaders['Authorization'];
  }

  // Update base URL
  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient();

// Export the class for custom instances if needed
export { ApiClient };