// Booking service
import { apiClient, ApiError } from '../lib/api';
import { Booking, PaginatedResponse, UUID } from '../types'; // Asumimos que BookingFormData ya no es necesario

// TIPOS INTERNOS para la comunicación con el API (usando snake_case)
interface QuoteRequest {
    experience_id: string; // UUID
    schedule_id: string;   // UUID del horario seleccionado
    number_of_participants: number;
    promotion_id?: string;
}

interface Quote extends QuoteRequest {
    base_price_per_person: number;
    subtotal: number;
    discount: number;
    total: number;
}

// Tipo de datos que recibía tu función original, la usamos para mantener compatibilidad
interface BookingFormData {
    scheduleId: string; // camelCase
    userId: string;     // camelCase
    numberOfParticipants: number; // camelCase
    specialRequests?: string; // camelCase
    // Agrega más campos si son necesarios
}

export class BookingService {
    // FIX 1: Cambiamos a solo '/bookings'. El apiClient añade el '/api/v1'.
    private static readonly baseUrl = '/bookings'; 

    // --- MÉTODOS EXISTENTES (Base URL corregida) ---

    static async getBookings(
        page: number = 1,
        limit: number = 10,
        status?: string
    ): Promise<PaginatedResponse<Booking>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (status) {
            params.append('status', status);
        }

        const response = await apiClient.get<PaginatedResponse<Booking>>(
            `${this.baseUrl}?${params}`
        );
        return response.data;
    }

    static async getBookingById(id: string): Promise<Booking> {
        const response = await apiClient.get<Booking>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    /**
     * Crea una reserva. Mapea de camelCase (frontend) a snake_case (backend).
     * Endpoint: POST /bookings
     */
    static async createBooking(
        experienceId: string, // <-- Mantenemos la firma original
        data: BookingFormData // <-- Mantenemos la firma original
    ): Promise<Booking> {
        // FIX 2: Mapeo a snake_case requerido por el backend (experience_id, schedule_id, etc.)
        const requestBody = {
            experience_id: experienceId,
            schedule_id: data.scheduleId, // Asumimos que estos son UUIDs
            user_id: data.userId, 
            number_of_participants: data.numberOfParticipants,
            special_requests: data.specialRequests,
        };

        try {
            const response = await apiClient.post<Booking>(
                this.baseUrl,
                requestBody
            );
            return response.data;
        } catch (error) {
            console.error('❌ BookingService.createBooking - Error:', error);
            throw error as ApiError;
        }
    }

    /**
     * Cotiza la reserva.
     * Endpoint: POST /bookings/quote
     */
    static async quoteBooking(request: QuoteRequest): Promise<Quote> {
        try {
            // Nota: Aquí la request ya está en snake_case
            const response = await apiClient.post<Quote>(
                `${this.baseUrl}/quote`,
                request
            );
            return response.data;
        } catch (error) {
            console.error('❌ BookingService.quoteBooking - Error:', error);
            throw error as ApiError;
        }
    }

    // --- Resto de métodos ---
    static async updateBooking(id: string, data: Partial<BookingFormData>): Promise<Booking> {
        const response = await apiClient.put<Booking>(`${this.baseUrl}/${id}`, data);
        return response.data;
    }

    static async cancelBooking(id: string): Promise<Booking> {
        const response = await apiClient.patch<Booking>(`${this.baseUrl}/${id}/cancel`);
        return response.data;
    }

    static async confirmBooking(id: string): Promise<Booking> {
        const response = await apiClient.patch<Booking>(`${this.baseUrl}/${id}/confirm`);
        return response.data;
    }

    static async getHostBookings(
        page: number = 1,
        limit: number = 10,
        status?: string
    ): Promise<PaginatedResponse<Booking>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (status) {
            params.append('status', status);
        }

        const response = await apiClient.get<PaginatedResponse<Booking>>(
            `${this.baseUrl}/host?${params}`
        );
        return response.data;
    }

    static async getGuestBookings(
        page: number = 1,
        limit: number = 10,
        status?: string
    ): Promise<PaginatedResponse<Booking>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (status) {
            params.append('status', status);
        }

        const response = await apiClient.get<PaginatedResponse<Booking>>(
            `${this.baseUrl}/guest?${params}`
        );
        return response.data;
    }
}