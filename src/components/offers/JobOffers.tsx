import React from 'react';
import { useJobOffers } from '../../hooks/useJobOffers';
import JobOfferCard from './JobOfferCard';
import LoadMoreButton from '../ui/LoadMoreButton';
import { useInView } from 'react-intersection-observer';

export default function JobOffers() {
  const { offers, loading, hasMore, loadMore } = useJobOffers();
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false
  });

  // Charger plus d'offres quand l'élément devient visible
  React.useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading]);

  if (!offers.length && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Aucune offre disponible pour le moment.</p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Offres d'emploi</h2>
          <p className="text-xl text-gray-600">
            Découvrez nos dernières opportunités de carrière
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {offers.map((offer) => (
            <JobOfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        {/* Élément observé pour le chargement infini */}
        {(hasMore || loading) && (
          <div ref={ref} className="flex justify-center">
            <LoadMoreButton 
              onClick={loadMore}
              loading={loading}
              disabled={loading || !hasMore}
            />
          </div>
        )}
      </div>
    </section>
  );
}