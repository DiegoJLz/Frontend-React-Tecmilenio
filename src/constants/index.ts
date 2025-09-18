// Application constants
export const APP_NAME = 'Local Experiences';
export const APP_DESCRIPTION = 'Discover and book unique local experiences';

// API endpoints
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Experience categories
export const EXPERIENCE_CATEGORIES = [
  { value: 'food', label: 'Food & Drink' },
  { value: 'culture', label: 'Culture & Arts' },
  { value: 'adventure', label: 'Adventure & Sports' },
  { value: 'wellness', label: 'Wellness & Relaxation' },
  { value: 'education', label: 'Education & Learning' },
  { value: 'nature', label: 'Nature & Outdoors' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'shopping', label: 'Shopping & Markets' },
] as const;

// Booking status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// User roles
export const USER_ROLES = {
  GUEST: 'guest',
  HOST: 'host',
  ADMIN: 'admin',
} as const;

// Pagination
export const PAGINATION_LIMITS = {
  EXPERIENCES: 12,
  BOOKINGS: 10,
  REVIEWS: 8,
} as const;
