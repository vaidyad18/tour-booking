export interface Tour {
  id: number;
  image: string;
  discountInPercentage: string;
  title: string;
  description: string;
  duration: string;
  actualPrice: number;
  discountedPrice: number;
  wishlist?: boolean;
}

export interface TourDetail extends Tour {
  overview: string;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  location: {
    country: string;
    startLocation: string;
    endLocation: string;
    peopleCount: string;
    difficulty: string;
    startDate: string;
    endDate: string;
  };
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface BookingForm {
  name: string;
  email: string;
  confirmEmail: string;
  phone: string;
  addOns: string;
  numberOfTickets: number;
  additionalInfo: string;
}

export interface TourListResponse {
  message: string;
  status: string;
  data: Tour[];
}

export interface TourDetailResponse {
  message: string;
  status: string;
  data: TourDetail;
}
