import { 
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  FirestoreError,
  where
} from 'firebase/firestore';
import { db } from '../firebase/db';
import { COLLECTIONS } from '../firebase/collections';
import { Offer } from './types';
import { AppError, handleFirebaseError } from '../../utils/error';

class OffersService {
  async getOfferById(id: string): Promise<Offer> {
    try {
      const offerRef = doc(db, COLLECTIONS.OFFERS, id);
      const offerSnap = await getDoc(offerRef);
      
      if (!offerSnap.exists()) {
        throw new AppError('Offre introuvable', 'NOT_FOUND');
      }

      const data = offerSnap.data();
      if (!data) {
        throw new AppError('Données de l\'offre invalides', 'INVALID_DATA');
      }

      return {
        id: offerSnap.id,
        ...data,
        availableAirports: data.availableAirports || []
      } as Offer;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error instanceof FirestoreError) {
        console.error('Firestore error:', {
          code: error.code,
          message: error.message,
          stack: error.stack
        });
        throw new AppError(
          'Erreur lors de la récupération de l\'offre',
          'FIRESTORE_ERROR',
          error
        );
      }
      throw handleFirebaseError(error);
    }
  }

  subscribeToOffers(callback: (offers: Offer[]) => void): () => void {
    try {
      const offersRef = collection(db, COLLECTIONS.OFFERS);
      const q = query(
        offersRef,
        where('status', '==', 'active'),
        orderBy('created_at', 'desc')
      );

      return onSnapshot(
        q, 
        (snapshot) => {
          const offers = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              availableAirports: data.availableAirports || []
            } as Offer;
          });
          callback(offers);
        },
        (error) => {
          console.error('Subscription error:', error);
          // Fallback to regular fetch on subscription error
          this.getActiveOffers().then(callback).catch(console.error);
        }
      );
    } catch (error) {
      console.error('Error setting up subscription:', error);
      return () => {};
    }
  }

  private async getActiveOffers(): Promise<Offer[]> {
    try {
      const offersRef = collection(db, COLLECTIONS.OFFERS);
      const q = query(
        offersRef,
        where('status', '==', 'active'),
        orderBy('created_at', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          availableAirports: data.availableAirports || []
        } as Offer;
      });
    } catch (error) {
      console.error('Error fetching active offers:', error);
      return [];
    }
  }
}

export const offersService = new OffersService();