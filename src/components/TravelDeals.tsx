import React, { useState } from 'react';
import { useOffersSync } from '../hooks/useOffersSync';
import DealHeader from './deals/DealHeader';
import DealGrid from './deals/DealGrid';
import LoadMoreButton from './ui/LoadMoreButton';

const ITEMS_PER_PAGE = 8;

export default function TravelDeals() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(false);
  const { offers } = useOffersSync();

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
    // Simuler un délai de chargement
    setTimeout(() => {
      setVisibleItems(prev => prev + ITEMS_PER_PAGE);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="bg-white py-24">
      <div className="container mx-auto px-6">
        <DealHeader />
        
        <div className="mb-12">
          <DealGrid
            offers={activeOffers.slice(0, visibleItems)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <LoadMoreButton
              onClick={loadMore}
              loading={loading}
              disabled={loading}
            />
          </div>
        )}
      </div>
    </div>
  );
}