import { formatDistanceToNow, differenceInDays } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatPublicationDate = (date: string | Date): string => {
  const publishDate = new Date(date);
  return formatDistanceToNow(publishDate, { 
    addSuffix: true,
    locale: fr 
  });
};

export const isOfferExpired = (date: string | Date, maxAgeDays: number = 30): boolean => {
  const publishDate = new Date(date);
  return differenceInDays(new Date(), publishDate) > maxAgeDays;
};

export const getPublicationStatus = (date: string | Date): 'recent' | 'normal' | 'old' => {
  const days = differenceInDays(new Date(), new Date(date));
  if (days <= 2) return 'recent';
  if (days >= 30) return 'old';
  return 'normal';
};