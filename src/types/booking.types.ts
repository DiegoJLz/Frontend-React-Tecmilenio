import { BaseEntity, UUID } from './common.types'; // Asumimos que UUID existe aquí
import { Experience, ExperienceSchedule } from './experience.types';
import { User } from './auth.types';

// Definimos los estados posibles basados en tu base de datos
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Esta interfaz coincide exactamente con la tabla 'bookings' del diagrama
export interface Booking extends BaseEntity {
    booking_reference: string;
    number_of_participants: number;
    total_price: number;
    status: BookingStatus;
    booking_date: string; // ISO string
    special_requests?: string;

    // --- PROPIEDADES AÑADIDAS PARA COMPILAR ---
    // El backend envía estas claves foráneas de forma plana:
    experience_id: UUID;     
    schedule_id: UUID;       
    currency: string;        
    // ------------------------------------------

    // Relaciones (Opcionales dependiendo de si el backend las incluye en la respuesta)
    user?: User;
    experience?: Experience;
    schedule?: ExperienceSchedule;
}

// Interface auxiliar para formularios de creación de reserva
export interface BookingFormData {
    experience_id: string;
    schedule_id: string;
    number_of_participants: number;
    special_requests?: string;
}

// Esta interfaz coincide con la tabla 'payments'
export interface Payment extends BaseEntity {
    amount: number;
    payment_method: string;
    status: string;
    transaction_id: string;
}