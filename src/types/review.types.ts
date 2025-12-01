// src/types/review.types.ts

import { BaseEntity, UUID } from './common.types';
import { User } from './auth.types'; 

export interface Review extends BaseEntity {
  // Foreign Keys (snake_case para coincidir con el DB schema)
  experience_id: UUID; // Debe ser snake_case para tu DB [cite: 45]
  booking_id?: UUID;    // Optional, ya que se pueden comentar experiencias sin reservar [cite: 45]
  
  // Contenido de la reseña
  rating: number;
  title: string;
  comment: string;
  is_verified: boolean;

  // Relación: Usamos el objeto completo del autor en el frontend.
  author: User; 
}