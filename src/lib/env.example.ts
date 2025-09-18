// Environment variables example
// Copy this file to .env.local and update the values

export const envExample = {
  // API Configuration
  NEXT_PUBLIC_API_URL: 'http://localhost:8080',

  // Application Configuration
  NEXT_PUBLIC_APP_NAME: 'Local Experiences',
  NEXT_PUBLIC_APP_DESCRIPTION: 'Discover and book unique local experiences',

  // Environment
  NODE_ENV: 'development',

  // Optional: External Services
  // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: 'your_google_maps_api_key',
  // NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'your_stripe_publishable_key',
  // NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: 'your_cloudinary_cloud_name',
} as const;

// Instructions:
// 1. Create a .env.local file in the root directory
// 2. Copy the variables above and update the values
// 3. Make sure to add .env.local to your .gitignore file
