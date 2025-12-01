// Review service
import { apiClient, ApiError } from '../lib/api';
// Solo importamos los tipos que sabemos que existen
import { Review, PaginatedResponse, UUID } from '../types'; 

// FIX 1: Definimos la interfaz específica que necesitamos para crear una reseña.
// Esto resuelve el error de 'ReviewFormData' y los errores de propiedades.
interface CreateReviewRequest {
    bookingId: string;
    userId: string;
    rating: number;
    title: string;
    comment: string;
}

// Tipo de datos que recibía tu función original, lo necesitamos para otros métodos
interface ReviewFormData {
    rating: number;
    title: string;
    comment: string;
    // Agrega aquí cualquier otro campo que tu amigo haya puesto en ReviewFormData
}


export class ReviewService {
    // El apiClient añade /api/v1/, solo necesitamos la ruta de los recursos.
    private static readonly baseReviewsUrl = '/reviews';
    private static readonly baseExperiencesUrl = '/experiences';

    // --- MÉTODOS EXISTENTES ---

    static async getReviews(
        experienceId: string,
        page: number = 1,
        limit: number = 8
    ): Promise<PaginatedResponse<Review>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await apiClient.get<PaginatedResponse<Review>>(
            `${this.baseExperiencesUrl}/${experienceId}/reviews?${params}`
        );
        return response.data;
    }

    static async getReviewById(id: string): Promise<Review> {
        const response = await apiClient.get<Review>(`${this.baseReviewsUrl}/${id}`);
        return response.data;
    }

    /**
     * Crea una reseña. Espera el ID de la experiencia y el payload de la reseña.
     * Endpoint: POST /experiences/{id}/reviews
     */
    static async createReview(
        experienceId: string, 
        data: CreateReviewRequest // FIX 2: Usamos la interfaz CreateReviewRequest
    ): Promise<Review> {
        
        // Mapeo de camelCase (data) a snake_case (backend Rust)
        const requestBody = {
            booking_id: data.bookingId,
            user_id: data.userId,
            rating: data.rating,
            title: data.title,
            comment: data.comment,
        };

        try {
            const response = await apiClient.post<Review>(
                `${this.baseExperiencesUrl}/${experienceId}/reviews`, 
                requestBody 
            );
            return response.data;
        } catch (error) {
            console.error('❌ ReviewService.createReview - Error:', error);
            throw error as ApiError;
        }
    }
    
    // El resto de métodos se dejan con un tipo genérico ('any') para evitar
    // romperlos, pero el método de creación (el importante) ya está tipado correctamente.

    static async updateReview(id: string, data: Partial<any>): Promise<Review> { 
        const response = await apiClient.put<Review>(`${this.baseReviewsUrl}/${id}`, data);
        return response.data;
    }

    static async deleteReview(id: string): Promise<void> {
        await apiClient.delete(`${this.baseReviewsUrl}/${id}`);
    }

    static async getUserReviews(
        userId: string,
        page: number = 1,
        limit: number = 8
    ): Promise<PaginatedResponse<Review>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        const response = await apiClient.get<PaginatedResponse<Review>>(
            `${this.baseReviewsUrl}/user/${userId}?${params}`
        );
        return response.data;
    }

    static async uploadReviewImages(
        reviewId: string,
        images: File[]
    ): Promise<{ urls: string[] }> {
        const formData = new FormData();
        images.forEach((image) => {
            formData.append('images', image);
        });

        const response = await apiClient.upload<{ urls: string[] }>(
            `${this.baseReviewsUrl}/${reviewId}/images`,
            formData
        );
        return response.data;
    }
}