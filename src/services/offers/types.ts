export interface AirportBookingLink {
  airportCode: string;
  bookingUrl: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: 'SÉJOURS' | 'VOLS' | 'HÔTELS';
  status: 'active' | 'inactive';
  featured: boolean;
  availableAirports: string[];
  airportBookingLinks: AirportBookingLink[];
  baggage?: {
    handBaggage?: {
      included: boolean;
    };
    cabinBaggage?: {
      included: boolean;
    };
  };
  created_at: string;
  updated_at: string;
}

export type CreateOfferData = Omit<Offer, 'id' | 'created_at' | 'updated_at'>;
export type UpdateOfferData = Partial<Offer>;