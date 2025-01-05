import { format } from 'date-fns';

const TRAVELPAYPOUT_API_KEY = import.meta.env.VITE_TRAVELPAYPOUT_API_KEY || '';
const KIWI_API_URL = 'https://tequila-api.kiwi.com';
const AFFILIATE_ID = import.meta.env.VITE_AFFILIATE_ID || '';

export interface FlightOffer {
  id: string;
  price: number;
  airlines: string[];
  cityFrom: string;
  cityTo: string;
  flyFrom: string;
  flyTo: string;
  local_departure: string;
  local_arrival: string;
  duration: {
    departure: number;
    return?: number;
    total: number;
  };
  deep_link: string;
  booking_token: string;
}

export interface SearchParams {
  fly_from: string;
  fly_to: string;
  date_from: string;
  date_to?: string;
  return_from?: string;
  return_to?: string;
  adults: number;
  selected_cabins: string;
  curr: string;
  locale: string;
}

export async function searchFlights(params: {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date | null;
  adults: number;
  travelClass: string;
}): Promise<FlightOffer[]> {
  try {
    const searchParams: SearchParams = {
      fly_from: params.origin,
      fly_to: params.destination,
      date_from: format(params.departureDate, 'dd/MM/yyyy'),
      date_to: format(params.departureDate, 'dd/MM/yyyy'),
      adults: params.adults,
      selected_cabins: params.travelClass.toLowerCase(),
      curr: 'EUR',
      locale: 'fr'
    };

    if (params.returnDate) {
      searchParams.return_from = format(params.returnDate, 'dd/MM/yyyy');
      searchParams.return_to = format(params.returnDate, 'dd/MM/yyyy');
    }

    const queryParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString());
      }
    });

    const response = await fetch(`${KIWI_API_URL}/v2/search?${queryParams}`, {
      headers: {
        'apikey': TRAVELPAYPOUT_API_KEY,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche de vols');
    }

    const data = await response.json();
    
    return data.data.map((offer: any) => ({
      id: offer.id,
      price: offer.price,
      airlines: offer.airlines,
      cityFrom: offer.cityFrom,
      cityTo: offer.cityTo,
      flyFrom: offer.flyFrom,
      flyTo: offer.flyTo,
      local_departure: offer.local_departure,
      local_arrival: offer.local_arrival,
      duration: {
        total: offer.duration.total,
        departure: offer.duration.departure,
        return: offer.duration.return
      },
      deep_link: `${offer.deep_link}&affiliate_id=${AFFILIATE_ID}`,
      booking_token: offer.booking_token
    }));
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    throw error;
  }
}

export async function searchLocations(query: string): Promise<any[]> {
  try {
    const response = await fetch(`${KIWI_API_URL}/locations/query?term=${encodeURIComponent(query)}&locale=fr-FR`, {
      headers: {
        'apikey': TRAVELPAYPOUT_API_KEY,
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche des locations');
    }

    const data = await response.json();
    return data.locations.map((location: any) => ({
      id: location.id,
      code: location.code,
      name: location.name,
      city: location.city?.name,
      country: location.country?.name
    }));
  } catch (error) {
    console.error('Erreur lors de la recherche des locations:', error);
    return [];
  }
}