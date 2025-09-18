// Booking service
import { apiClient } from '../lib/api';
import { Booking, BookingFormData, PaginatedResponse } from '../types';

export class BookingService {
  private static readonly baseUrl = '/api/v1/bookings';

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

  static async createBooking(
    experienceId: string,
    data: BookingFormData
  ): Promise<Booking> {
    const response = await apiClient.post<Booking>(
      `${this.baseUrl}`,
      {
        experienceId,
        ...data,
      }
    );
    return response.data;
  }

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
