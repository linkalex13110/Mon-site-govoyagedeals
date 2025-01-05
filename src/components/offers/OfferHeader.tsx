import React from 'react';
import { MapPin, Calendar, Tag } from 'lucide-react';
import { Offer } from '../../services/offers.service';
import { PublicationDate } from '../ui/PublicationDate';
import { Price } from '../ui/Price';
import { getCategoryWithEmoji } from '../../utils/categoryEmojis';
import OfferImage from './OfferImage';

interface OfferHeaderProps {
  offer: Offer;
}

export default function OfferHeader({ offer }: OfferHeaderProps) {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <OfferImage
        src={offer.image_url}
        alt={offer.title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Contenu */}
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            {/* Catégorie et date */}
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-gray-900 font-medium">
                {getCategoryWithEmoji(offer.category)}
              </span>
              <PublicationDate date={offer.created_at} />
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-bold text-white mb-4">
              {offer.title}
            </h1>

            {/* Prix */}
            <div className="bg-white/90 backdrop-blur-sm inline-block px-6 py-3 rounded-xl">
              <Price value={offer.price} showFrom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}