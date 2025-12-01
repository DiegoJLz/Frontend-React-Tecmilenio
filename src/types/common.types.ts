// Common types

// 1. Tipos base
export type UUID = string;

export interface BaseEntity {
  id: UUID;
  created_at: string;
  updated_at?: string;
}

// 2. Utilidades de Respuesta API
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

// 3. Utilidades UI
export interface SelectOption {
  value: string;
  label: string;
}

// 4. Utilidades de Ubicación
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  address: string;
  city: string;
  coordinates: Coordinates;
}