import React from 'react';
import DealCard from './DealCard';
import { Offer } from '../../services/offers.service';

interface DealGridProps {
  offers: Offer[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function DealGrid({ 
  offers, 
  favorites, 
  onToggleFavorite
}: DealGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {offers.map((offer) => (
        <DealCard
          key={offer.id}
          offer={offer}
          isFavorite={favorites.includes(offer.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}