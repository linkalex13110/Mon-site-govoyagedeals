import { useQuery, useQueryClient } from '@tanstack/react-query';
import { offersService } from '../services/offers.service';

export function useOfferDetails(id: string) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['offer', id],
    queryFn: () => offersService.getOfferById(id),
    staleTime: 5 * 60 * 1000, // Cache valide 5 minutes
    cacheTime: 30 * 60 * 1000, // Garde en cache 30 minutes
    // Précharge les images
    onSuccess: (data) => {
      if (data.image_url) {
        const img = new Image();
        img.src = data.image_url;
      }
    }
  });
}