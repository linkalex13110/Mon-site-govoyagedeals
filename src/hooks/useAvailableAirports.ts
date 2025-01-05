import { useQuery } from '@tanstack/react-query';
import { airportsService } from '../services/airports.service';
import { offersService } from '../services/offers.service';

export function useAvailableAirports(offerId: string) {
  return useQuery({
    queryKey: ['availableAirports', offerId],
    queryFn: async () => {
      const offer = await offersService.getOfferById(offerId);
      const airports = await airportsService.getAvailableAirports();
      return airports.filter(airport => 
        airport.available && offer.availableAirports.includes(airport.code)
      );
    }
  });
}