// Application configuration
export const config = {
  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    timeout: 10000, // 10 seconds
    retryAttempts: 3,
  },

  // Application settings
  app: {
    name: 'Local Experiences',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },

  // Authentication
  auth: {
    tokenKey: 'auth_token',
    refreshTokenKey: 'refresh_token',
    tokenExpiryKey: 'token_expiry',
  },

  // File upload
  upload: {
    maxFileSize: 10 * 1024 * 1024, // 10MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedDocumentTypes: ['application/pdf', 'text/plain'],
  },

  // Pagination
  pagination: {
    defaultLimit: 12,
    maxLimit: 100,
  },

  // Cache
  cache: {
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
} as const;

// Environment validation
export const validateConfig = () => {
  const requiredEnvVars = [
    'NEXT_PUBLIC_API_URL',
  ];

  const missing = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missing.length > 0 && config.app.environment === 'production') {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }

  return missing.length === 0;
};

// Initialize config validation
validateConfig();
