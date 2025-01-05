import { useQuery } from '@tanstack/react-query';
import { offersService } from '../services/offers/offers.service';
import { toast } from 'react-hot-toast';
import { AppError } from '../utils/error';

export function useOffer(id: string | undefined) {
  return useQuery({
    queryKey: ['offer', id],
    queryFn: async () => {
      if (!id) {
        throw new AppError('ID de l\'offre requis', 'MISSING_ID');
      }
      return await offersService.getOfferById(id);
    },
    enabled: Boolean(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    onError: (error: unknown) => {
      if (error instanceof AppError) {
        toast.error(error.message);
      } else {
        toast.error('Une erreur est survenue lors de la récupération de l\'offre');
      }
      console.error('Error fetching offer:', error);
    }
  });
}