import { BaseEntity, UUID } from './common.types';
import { User } from './auth.types';

export interface Category extends BaseEntity {
  name: string;
  icon_url?: string;
  background_image_url?: string;
}

// Usamos ExperienceLocation para evitar conflicto con el objeto Location del navegador
export interface ExperienceLocation extends BaseEntity {
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface ExperienceImage extends BaseEntity {
  image_url: string;
  is_primary: boolean;
}

export interface Experience extends BaseEntity {
  title: string;
  slug: string;
  summary: string;
  description: string;
  price_per_person: number;
  currency: string;
  duration_hours: number;
  difficulty_level: number;
  max_participants: number;
  min_participants: number;
  average_rating: number;
  review_count: number;
  
  // Relaciones (Opcionales porque pueden no venir en todas las consultas)
  host?: User;
  category?: Category;
  location?: ExperienceLocation;
  images?: ExperienceImage[];
}

export interface ExperienceSchedule extends BaseEntity {
  start_datetime: string;
  end_datetime: string;
  max_available_spots: number;
  current_bookings: number;
  is_active: boolean;
}