// Health check utility for backend connectivity
export const checkBackendHealth = async (baseUrl: string = 'http://localhost:8080'): Promise<{
  isOnline: boolean;
  error?: string;
  response?: any;
}> => {
  try {
    console.log('🔍 Checking backend health at:', baseUrl);

    // Try a simple GET request to check if the server is running
    const response = await fetch(`${baseUrl}/api/v1/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend is online:', data);
      return {
        isOnline: true,
        response: data,
      };
    } else {
      console.log('⚠️ Backend responded with error:', response.status, response.statusText);
      return {
        isOnline: false,
        error: `Server responded with ${response.status}: ${response.statusText}`,
      };
    }
  } catch (error) {
    console.error('❌ Backend health check failed:', error);

    let errorMessage = 'Unknown error';
    if (error instanceof TypeError) {
      if (error.message.includes('fetch')) {
        errorMessage = 'Network error: Backend server is not running or not accessible';
      } else if (error.message.includes('CORS')) {
        errorMessage = 'CORS error: Backend server needs to allow requests from this origin';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      isOnline: false,
      error: errorMessage,
    };
  }
};

// Test multiple endpoints to find the correct one
export const findBackendEndpoint = async (): Promise<{
  workingEndpoint?: string;
  errors: Record<string, string>;
}> => {
  const endpoints = [
    'http://localhost:8080/api/v1/health',
    'http://localhost:8080/health',
    'http://localhost:8080/api/health',
    'http://localhost:8080/',
  ];

  const errors: Record<string, string> = {};

  for (const endpoint of endpoints) {
    try {
      console.log('🔍 Testing endpoint:', endpoint);

      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });

      if (response.ok) {
        console.log('✅ Working endpoint found:', endpoint);
        return {
          workingEndpoint: endpoint,
          errors,
        };
      } else {
        errors[endpoint] = `HTTP ${response.status}: ${response.statusText}`;
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      errors[endpoint] = errorMessage;
      console.log('❌ Endpoint failed:', endpoint, errorMessage);
    }
  }

  return { errors };
};
