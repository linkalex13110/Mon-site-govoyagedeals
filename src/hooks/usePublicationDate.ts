import { useState, useEffect } from 'react';
import { formatPublicationDate, isOfferExpired } from '../utils/date';
import { toast } from 'react-hot-toast';

export function usePublicationDate(date: string | Date, maxAgeDays: number = 30) {
  const [formattedDate, setFormattedDate] = useState(formatPublicationDate(date));
  const [isExpired, setIsExpired] = useState(isOfferExpired(date, maxAgeDays));

  useEffect(() => {
    // Mettre à jour le format de la date toutes les minutes
    const interval = setInterval(() => {
      setFormattedDate(formatPublicationDate(date));
    }, 60000);

    // Vérifier si l'offre expire
    const checkExpiration = () => {
      const expired = isOfferExpired(date, maxAgeDays);
      if (expired && !isExpired) {
        setIsExpired(true);
        toast.error('Cette offre a expiré');
      }
    };

    const expirationInterval = setInterval(checkExpiration, 3600000); // Vérifier toutes les heures

    return () => {
      clearInterval(interval);
      clearInterval(expirationInterval);
    };
  }, [date, maxAgeDays]);

  return {
    formattedDate,
    isExpired
  };
}