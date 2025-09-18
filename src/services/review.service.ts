// Review service
import { apiClient } from '../lib/api';
import { Review, ReviewFormData, PaginatedResponse } from '../types';

export class ReviewService {
  private static readonly baseUrl = '/api/v1/reviews';

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
      `${this.baseUrl}/experience/${experienceId}?${params}`
    );
    return response.data;
  }

  static async getReviewById(id: string): Promise<Review> {
    const response = await apiClient.get<Review>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  static async createReview(
    bookingId: string,
    data: ReviewFormData
  ): Promise<Review> {
    const response = await apiClient.post<Review>(
      `${this.baseUrl}`,
      {
        bookingId,
        ...data,
      }
    );
    return response.data;
  }

  static async updateReview(id: string, data: Partial<ReviewFormData>): Promise<Review> {
    const response = await apiClient.put<Review>(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  static async deleteReview(id: string): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${id}`);
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
      `${this.baseUrl}/user/${userId}?${params}`
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
      `${this.baseUrl}/${reviewId}/images`,
      formData
    );
    return response.data;
  }
}
