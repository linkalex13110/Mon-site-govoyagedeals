import { format } from 'date-fns';

const AMADEUS_CLIENT_ID = import.meta.env.VITE_AMADEUS_CLIENT_ID || '';
const AMADEUS_CLIENT_SECRET = import.meta.env.VITE_AMADEUS_CLIENT_SECRET || '';
const AMADEUS_API_URL = 'https://test.api.amadeus.com/v1';

interface AmadeusToken {
  access_token: string;
  expires_at: number;
}

let tokenData: AmadeusToken | null = null;

async function getToken(): Promise<string> {
  if (tokenData && tokenData.expires_at > Date.now()) {
    return tokenData.access_token;
  }

  const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: AMADEUS_CLIENT_ID,
      client_secret: AMADEUS_CLIENT_SECRET,
    }),
  });

  const data = await response.json();
  
  tokenData = {
    access_token: data.access_token,
    expires_at: Date.now() + data.expires_in * 1000,
  };

  return tokenData.access_token;
}

export interface FlightOffer {
  id: string;
  price: {
    total: string;
    currency: string;
  };
  itineraries: Array<{
    segments: Array<{
      departure: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        terminal?: string;
        at: string;
      };
      carrierCode: string;
      number: string;
      duration: string;
    }>;
  }>;
  validatingAirlineCodes: string[];
  affiliateLink?: string;
}

export interface HotelOffer {
  id: string;
  name: string;
  rating: string;
  description: {
    text: string;
  };
  price: {
    total: string;
    currency: string;
  };
  media: Array<{
    uri: string;
    category: string;
  }>;
  affiliateLink?: string;
}

export async function searchFlights(params: {
  origin: string;
  destination: string;
  departureDate: Date;
  returnDate?: Date;
  adults: number;
  travelClass: string;
}): Promise<FlightOffer[]> {
  const token = await getToken();
  
  const searchParams = new URLSearchParams({
    originLocationCode: params.origin,
    destinationLocationCode: params.destination,
    departureDate: format(params.departureDate, 'yyyy-MM-dd'),
    adults: params.adults.toString(),
    travelClass: params.travelClass,
    ...(params.returnDate && { returnDate: format(params.returnDate, 'yyyy-MM-dd') }),
    max: '10',
    currencyCode: 'EUR',
  });

  const response = await fetch(`${AMADEUS_API_URL}/shopping/flight-offers?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  
  // Add affiliate links to the offers
  return data.data.map((offer: FlightOffer) => ({
    ...offer,
    affiliateLink: generateAffiliateLink('flight', offer),
  }));
}

export async function searchHotels(params: {
  cityCode: string;
  checkInDate: Date;
  checkOutDate: Date;
  adults: number;
  roomQuantity: number;
}): Promise<HotelOffer[]> {
  const token = await getToken();

  const searchParams = new URLSearchParams({
    cityCode: params.cityCode,
    checkInDate: format(params.checkInDate, 'yyyy-MM-dd'),
    checkOutDate: format(params.checkOutDate, 'yyyy-MM-dd'),
    adults: params.adults.toString(),
    roomQuantity: params.roomQuantity.toString(),
    radius: '50',
    radiusUnit: 'KM',
    paymentPolicy: 'NONE',
    includeClosed: 'false',
    bestRateOnly: 'true',
    view: 'FULL',
    sort: 'PRICE',
  });

  const response = await fetch(`${AMADEUS_API_URL}/shopping/hotel-offers?${searchParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  
  // Add affiliate links to the offers
  return data.data.map((offer: HotelOffer) => ({
    ...offer,
    affiliateLink: generateAffiliateLink('hotel', offer),
  }));
}

// Fonction pour générer les liens d'affiliation
function generateAffiliateLink(type: 'flight' | 'hotel' | 'car', offer: any): string {
  const affiliateId = import.meta.env.VITE_AFFILIATE_ID || '';
  
  // Exemple avec différents partenaires d'affiliation
  const partners = {
    flight: {
      skyscanner: `https://www.skyscanner.fr/transport/flights/${offer.itineraries[0].segments[0].departure.iataCode}/${offer.itineraries[0].segments[0].arrival.iataCode}/?affiliate=${affiliateId}`,
      kayak: `https://www.kayak.fr/flights/${offer.itineraries[0].segments[0].departure.iataCode}-${offer.itineraries[0].segments[0].arrival.iataCode}/?affiliate=${affiliateId}`,
    },
    hotel: {
      booking: `https://www.booking.com/hotel/${offer.id}.html?aid=${affiliateId}`,
      expedia: `https://www.expedia.fr/hotel/${offer.id}?affid=${affiliateId}`,
    },
    car: {
      rentalcars: `https://www.rentalcars.com/SearchResults.do?affiliateCode=${affiliateId}`,
      europcar: `https://www.europcar.fr/location-voiture?affiliateId=${affiliateId}`,
    },
  };

  // Sélectionner aléatoirement un partenaire pour diversifier les sources
  const partnerList = Object.values(partners[type]);
  const randomPartner = partnerList[Math.floor(Math.random() * partnerList.length)];

  return randomPartner;
}