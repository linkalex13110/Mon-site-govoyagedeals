import React, { useState } from 'react';
import { useOffersSync } from '../hooks/useOffersSync';
import DealCard from './deals/DealCard';
import LoadMoreButton from './ui/LoadMoreButton';

const ITEMS_PER_PAGE = 8;

export default function DailyDeals() {
  const { offers } = useOffersSync();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  // Filtrer uniquement les offres actives
  const activeOffers = offers?.filter(offer => offer.status === 'active') || [];
  const hasMore = visibleItems < activeOffers.length;

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_PER_PAGE);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Dernières Offres</h2>
          <p className="text-gray-400">Les meilleures offres sélectionnées par nos experts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeOffers.slice(0, visibleItems).map((offer) => (
          <DealCard
            key={offer.id}
            offer={offer}
            isFavorite={favorites.includes(offer.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <LoadMoreButton
            onClick={loadMore}
            loading={loading}
            disabled={loading}
          />
        </div>
      )}
    </div>
  );
}