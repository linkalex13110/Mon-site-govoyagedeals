import { create } from 'zustand';
import { Offer } from '../services/offers.service';

interface OffersState {
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
}

export const useOffers = create<OffersState>((set) => ({
  offers: [],
  setOffers: (offers) => set({ offers })
}));