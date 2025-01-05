export interface Offer {
  id: string;
  type: 'FLIGHT' | 'HOTEL' | 'PACKAGE';
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  location: string;
  image: string;
  startDate?: string;
  endDate?: string;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface OfferFormData extends Omit<Offer, 'id'> {}

export interface OfferFilters {
  type?: Offer['type'];
  status?: Offer['status'];
  featured?: boolean;
}