import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Offer } from '../../services/offers.service';
import { formatPrice } from '../../utils/format';
import { getCategoryWithEmoji } from '../../utils/categoryEmojis';
import { LazyImage } from '../ui/LazyImage';
import { PublicationDate } from '../ui/PublicationDate';

interface DealCardProps {
  offer: Offer;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function DealCard({ offer, isFavorite, onToggleFavorite }: DealCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <LazyImage
          src={offer.image_url}
          alt={offer.title}
          className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(offer.id);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <Heart 
            className={`w-5 h-5 ${
              isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-600'
            }`}
          />
        </button>
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center gap-1.5 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
            {getCategoryWithEmoji(offer.category)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <PublicationDate date={offer.created_at} />
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
          {offer.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {offer.description}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">À partir de</p>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(offer.price)}€</p>
          </div>
          <Link
            to={`/offres/${offer.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-medium"
          >
            Voir l'offre
          </Link>
        </div>
      </div>
    </div>
  );
}