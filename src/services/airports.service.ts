import { 
  collection, 
  getDocs,
  setDoc,
  doc, 
  query, 
  where, 
  onSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Airport {
  code: string;
  name: string;
  city: string;
  available: boolean;
}

class AirportsService {
  private collectionName = 'departure_airports';

  async getAvailableAirports(): Promise<Airport[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('available', '==', true)
      );
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        code: doc.id,
        name: doc.data().name,
        city: doc.data().city,
        available: doc.data().available
      })) as Airport[];
    } catch (error) {
      console.error('Error fetching airports:', error);
      return [];
    }
  }

  async updateAirportStatus(code: string, data: Partial<Airport>): Promise<void> {
    try {
      const airportRef = doc(db, this.collectionName, code);
      await setDoc(airportRef, { 
        ...data,
        available: data.available ?? false 
      }, { merge: true });
    } catch (error) {
      console.error('Error updating airport:', error);
      throw error;
    }
  }

  subscribeToAirports(callback: (airports: Airport[]) => void) {
    const q = query(collection(db, this.collectionName));
    
    return onSnapshot(q, 
      (snapshot) => {
        const airports = snapshot.docs.map(doc => ({
          code: doc.id,
          name: doc.data().name,
          city: doc.data().city,
          available: doc.data().available
        })) as Airport[];
        callback(airports);
      },
      (error) => {
        console.error('Error in airports subscription:', error);
        this.getAvailableAirports()
          .then(airports => callback(airports))
          .catch(error => console.error('Fallback error:', error));
      }
    );
  }
}

export const airportsService = new AirportsService();