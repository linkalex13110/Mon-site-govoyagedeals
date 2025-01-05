import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  Firestore,
  DocumentSnapshot,
  where
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Offer {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category: 'SÉJOURS' | 'VOLS' | 'HÔTELS';
  status: 'active' | 'inactive';
  featured: boolean;
  availableAirports: string[];
  created_at: string;
  updated_at: string;
}

class OffersService {
  private db: Firestore;
  private collectionName = 'offers';

  constructor(db: Firestore) {
    this.db = db;
  }

  async getOfferById(id: string): Promise<Offer> {
    try {
      const offerRef = doc(this.db, this.collectionName, id);
      const offerSnap = await getDoc(offerRef);
      
      if (!offerSnap.exists()) {
        throw new Error('Offre introuvable');
      }

      return {
        id: offerSnap.id,
        ...offerSnap.data(),
        availableAirports: offerSnap.data().availableAirports || []
      } as Offer;
    } catch (error) {
      console.error('Error getting offer:', error);
      throw new Error('Offre introuvable');
    }
  }

  async getActiveOffers(): Promise<Offer[]> {
    try {
      const offersRef = collection(this.db, this.collectionName);
      const q = query(
        offersRef,
        where('status', '==', 'active'),
        orderBy('created_at', 'desc')
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        availableAirports: doc.data().availableAirports || []
      })) as Offer[];
    } catch (error) {
      console.error('Error getting offers:', error);
      return [];
    }
  }

  subscribeToOffers(callback: (offers: Offer[]) => void) {
    try {
      const offersRef = collection(this.db, this.collectionName);
      const q = query(offersRef, orderBy('created_at', 'desc'));

      return onSnapshot(q, 
        (snapshot) => {
          const offers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            availableAirports: doc.data().availableAirports || []
          })) as Offer[];
          callback(offers);
        },
        (error) => {
          console.error('Error in offers subscription:', error);
          this.getActiveOffers().then(callback);
        }
      );
    } catch (error) {
      console.error('Error setting up offers subscription:', error);
      return () => {};
    }
  }

  async createOffer(data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>): Promise<Offer> {
    try {
      const now = new Date().toISOString();
      const offerData = {
        ...data,
        created_at: now,
        updated_at: now,
        availableAirports: data.availableAirports || []
      };

      const docRef = await addDoc(collection(this.db, this.collectionName), offerData);
      return { id: docRef.id, ...offerData };
    } catch (error) {
      console.error('Error creating offer:', error);
      throw new Error('Erreur lors de la création de l\'offre');
    }
  }

  async updateOffer(id: string, updates: Partial<Offer>): Promise<void> {
    try {
      const offerRef = doc(this.db, this.collectionName, id);
      await updateDoc(offerRef, {
        ...updates,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating offer:', error);
      throw new Error('Erreur lors de la mise à jour de l\'offre');
    }
  }

  async deleteOffer(id: string): Promise<void> {
    try {
      const offerRef = doc(this.db, this.collectionName, id);
      await deleteDoc(offerRef);
    } catch (error) {
      console.error('Error deleting offer:', error);
      throw new Error('Erreur lors de la suppression de l\'offre');
    }
  }
}

export const offersService = new OffersService(db);