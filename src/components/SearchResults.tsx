import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Plane, Clock, ExternalLink } from 'lucide-react';
import type { FlightOffer } from '../services/kiwi';

interface SearchResultsProps {
  type: 'flights' | 'hotels' | 'cars';
  results: FlightOffer[];
  loading: boolean;
  error?: string;
}

export default function SearchResults({ type, results, loading, error }: SearchResultsProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Aucun résultat trouvé pour votre recherche.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((offer: FlightOffer) => (
        <div key={offer.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plane className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    {offer.cityFrom} ({offer.flyFrom}) → {offer.cityTo} ({offer.flyTo})
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{format(new Date(offer.local_departure), 'dd MMM HH:mm', { locale: fr })}</span>
                    <Clock className="w-4 h-4" />
                    <span>{Math.floor(offer.duration.total / 3600)}h {Math.floor((offer.duration.total % 3600) / 60)}m</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{offer.price}€</p>
              <a
                href={offer.deep_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors mt-4"
              >
                <span>Réserver</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}