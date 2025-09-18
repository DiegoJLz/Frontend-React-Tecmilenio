// API Client for Rust backend
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

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
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
          errorMessage = errorData.message || errorMessage;
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

      // Handle different response formats from Rust backend
      if (data.success !== undefined) {
        // Backend returns { success, data, message } format
        return {
          data: data.data,
          message: data.message || 'Success',
          success: data.success,
          status: response.status,
        };
      } else {
        // Backend returns data directly
        return {
          data: data,
          message: 'Success',
          success: true,
          status: response.status,
        };
      }
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
    config: RequestConfig = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      credentials = 'include',
    } = config;

    const url = `${this.baseUrl}${endpoint}`;

    const requestConfig: RequestInit = {
      method,
      headers: {
        ...this.defaultHeaders,
        ...headers,
      },
    };

    if (body && method !== 'GET') {
      if (body instanceof FormData) {
        // Remove Content-Type for FormData to let browser set it with boundary
        delete (requestConfig.headers as Record<string, string>)['Content-Type'];
        requestConfig.body = body;
      } else {
        requestConfig.body = JSON.stringify(body);
      }
    }

    try {
      console.log('🌐 Making request to:', url);
      console.log('📋 Request config:', {
        method,
        headers: requestConfig.headers,
        body: requestConfig.body,
        mode: requestConfig.mode,
      });

      const response = await fetch(url, requestConfig);

      console.log('📡 Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      console.error('❌ Request failed:', error);

      // Check if it's a network error (backend not running)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        const networkError: ApiError = {
          message: 'Network error: Unable to connect to server. Please check if the backend is running on port 8080.',
          status: 0,
        };
        throw networkError;
      }

      // Check if it's a CORS error
      if (error instanceof TypeError && error.message.includes('CORS')) {
        const corsError: ApiError = {
          message: 'CORS error: The backend server needs to allow requests from this origin.',
          status: 0,
        };
        throw corsError;
      }

      // For other errors, just pass them through
      const genericError: ApiError = {
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 0,
      };
      throw genericError;
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
