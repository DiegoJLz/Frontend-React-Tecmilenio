// Experience service
import { apiClient, ApiError } from '../lib/api'; 
// Solo importamos los tipos que sabemos que existen. Eliminamos la dependencia directa de ExperienceFilters
import { Experience, PaginatedResponse } from '../types'; 

// FIX: Definimos la interfaz de filtros aquí temporalmente para resolver el error de importación.
// Si tu interfaz real está en otro lado, asegúrate de que esté exportada.
export interface ExperienceFilters {
    q?: string; // Para búsqueda o query
    category?: string;
    min_price?: number;
    max_price?: number;
    difficulty_level?: number;
}

export class ExperienceService {
    // FIX 1: Cambiamos la URL base a solo el recurso. El apiClient añade el '/api/v1'.
    private static readonly baseUrl = '/experiences';

    static async getExperiences(filters?: ExperienceFilters): Promise<Experience[]> {
        const params = new URLSearchParams();

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await apiClient.get<Experience[]>(
            `${this.baseUrl}?${params}`
        );
        return response.data;
    }

    static async getExperiencesPaginated(
        page: number = 1,
        limit: number = 12,
        filters?: ExperienceFilters
    ): Promise<PaginatedResponse<Experience>> {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
        });

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await apiClient.get<PaginatedResponse<Experience>>(
            `${this.baseUrl}/paginated?${params}`
        );
        return response.data;
    }

    /**
     * Obtiene los detalles de una experiencia por su SLUG.
     * Endpoint: GET /experiences/slug/{slug}
     */
    static async getExperienceBySlug(slug: string): Promise<Experience> {
        try {
            const response = await apiClient.get<Experience>(`${this.baseUrl}/slug/${slug}`);
            
            if (response.data) {
                return response.data;
            }
            
            throw { message: 'Experiencia no encontrada o respuesta vacía.', status: 404 } as ApiError;

        } catch (error) {
            console.error('❌ ExperienceService.getExperienceBySlug - Error:', error);
            throw error as ApiError;
        }
    }
    
    static async getExperienceById(id: string): Promise<Experience> {
        const response = await apiClient.get<Experience>(`${this.baseUrl}/${id}`);
        return response.data;
    }

    static async createExperience(data: Partial<Experience>): Promise<Experience> {
        const response = await apiClient.post<Experience>(this.baseUrl, data);
        return response.data;
    }

    static async updateExperience(id: string, data: Partial<Experience>): Promise<Experience> {
        const response = await apiClient.put<Experience>(`${this.baseUrl}/${id}`, data);
        return response.data;
    }

    static async deleteExperience(id: string): Promise<void> {
        await apiClient.delete(`${this.baseUrl}/${id}`);
    }

    static async uploadExperienceImages(
        experienceId: string,
        images: File[]
    ): Promise<{ urls: string[] }> {
        const formData = new FormData();
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });

        const response = await apiClient.upload<{ urls: string[] }>(
            `${this.baseUrl}/${experienceId}/images`,
            formData
        );
        return response.data;
    }

    static async searchExperiences(query: string, filters?: ExperienceFilters): Promise<Experience[]> {
        const params = new URLSearchParams({ q: query });

        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    params.append(key, value.toString());
                }
            });
        }

        const response = await apiClient.get<Experience[]>(
            `${this.baseUrl}/search?${params}`
        );
        return response.data;
    }
}