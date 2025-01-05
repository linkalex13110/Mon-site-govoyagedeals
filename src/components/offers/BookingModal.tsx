import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import type { Offer } from '../../services/offers/types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer?: Offer;
  bookingUrl: string;
}

export default function BookingModal({ isOpen, onClose, offer, bookingUrl }: BookingModalProps) {
  if (!isOpen || !offer) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold">Réserver votre voyage</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="font-medium text-gray-900 mb-2">{offer.title}</h3>
            <p className="text-gray-600 text-sm">{offer.description}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-xl mb-6">
            <p className="text-sm text-gray-600">Prix par personne</p>
            <p className="text-2xl font-bold text-blue-600">{formatPrice(offer.price)}€</p>
          </div>

          <div className="space-y-4">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              onClick={onClose}
            >
              <span>Continuer vers le site partenaire</span>
              <ExternalLink className="w-5 h-5" />
            </a>
            
            <p className="text-sm text-gray-500 text-center">
              Vous allez être redirigé vers notre site partenaire pour finaliser votre réservation en toute sécurité
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}