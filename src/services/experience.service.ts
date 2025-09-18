// Experience service
import { apiClient } from '../lib/api';
import { Experience, ExperienceFilters, PaginatedResponse } from '../types';

export class ExperienceService {
  private static readonly baseUrl = '/api/v1/experiences';

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
