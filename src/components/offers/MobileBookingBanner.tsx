import React, { useState } from 'react';
import { X, Plane } from 'lucide-react';
import { formatPrice } from '../../utils/format';
import AirportSelectionModal from '../airports/AirportSelectionModal';
import type { Airport } from '../../data/airports';

interface MobileBookingBannerProps {
  price: number;
  availableAirports: string[];
  onAirportSelect: (airport: Airport) => void;
  onBook: () => void;
  selectedAirport?: Airport | null;
}

export default function MobileBookingBanner({ 
  price, 
  availableAirports,
  onAirportSelect,
  onBook,
  selectedAirport
}: MobileBookingBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [showAirportModal, setShowAirportModal] = useState(false);

  if (isDismissed) return null;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 lg:hidden z-50 animate-fade-up">
        <div className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg px-4 py-3">
          <div className="flex items-center justify-between max-h-[60px]">
            <div>
              <p className="text-sm text-gray-600">À partir de</p>
              <p className="text-xl font-bold text-blue-600">{formatPrice(price)}€</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAirportModal(true)}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-2"
              >
                <Plane className="w-4 h-4" />
                {selectedAirport ? selectedAirport.code : "Choisir l'aéroport"}
              </button>
              
              <button
                onClick={onBook}
                disabled={!selectedAirport}
                className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Réserver
              </button>
              
              <button
                onClick={() => setIsDismissed(true)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AirportSelectionModal
        isOpen={showAirportModal}
        onClose={() => setShowAirportModal(false)}
        availableAirports={availableAirports}
        onSelect={(airport) => {
          onAirportSelect(airport);
          setShowAirportModal(false);
        }}
      />
    </>
  );
}