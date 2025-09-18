// Booking types
export interface Booking {
  id: string;
  experienceId: string;
  guestId: string;
  hostId: string;
  date: Date;
  time: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt: string;
  updatedAt: string;
  experience: {
    title: string;
    images: string[];
    location: {
      address: string;
      city: string;
    };
  };
  guest: {
    name: string;
    email: string;
    phone?: string;
  };
  host: {
    name: string;
    email: string;
    phone?: string;
  };
}

export interface BookingFormData {
  date: Date;
  time: string;
  guests: number;
  specialRequests?: string;
}
