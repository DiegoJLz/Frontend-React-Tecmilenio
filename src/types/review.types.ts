// Review types
export interface Review {
  id: string;
  bookingId: string;
  experienceId: string;
  guestId: string;
  hostId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
  guest: {
    name: string;
    avatar?: string;
  };
  experience: {
    title: string;
  };
}

export interface ReviewFormData {
  rating: number;
  comment: string;
  images?: File[];
}
