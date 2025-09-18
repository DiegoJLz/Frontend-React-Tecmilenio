// Experience types
export interface Experience {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  images: string[];
  price: number;
  duration: number; // in minutes
  maxGuests: number;
  category: string;
  location: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  host: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
  };
  rating: number;
  reviewCount: number;
  availability: Date[];
  tags: string[];
  requirements: string[];
  includes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ExperienceFilters {
  category?: string;
  priceMin?: number;
  priceMax?: number;
  duration?: number;
  location?: string;
  date?: Date;
  guests?: number;
  rating?: number;
}
