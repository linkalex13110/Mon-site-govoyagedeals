import { useEffect } from 'react';
import { useOffers } from './useOffers';
import { offersService } from '../services/offers.service';
import { toast } from 'react-hot-toast';

export function useOffersSync() {
  const { offers, setOffers } = useOffers();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = offersService.subscribeToOffers((updatedOffers) => {
        setOffers(updatedOffers);
      });
    } catch (error) {
      console.error('Error syncing offers:', error);
      toast.error('Erreur lors de la synchronisation des offres');
    }

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [setOffers]);

  return {
    offers,
    setOffers
  };
}