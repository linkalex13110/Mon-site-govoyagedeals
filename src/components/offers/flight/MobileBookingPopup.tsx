import React from 'react';
import { Plane } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import type { Airport } from '../../../data/airports';

interface MobileBookingPopupProps {
  isOpen: boolean;
  price: number;
  selectedAirport: Airport | null;
  onSelectAirport: () => void;
  onBook: () => void;
}

export default function MobileBookingPopup({
  isOpen,
  price,
  selectedAirport,
  onSelectAirport,
  onBook
}: MobileBookingPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 lg:hidden bg-white border-t border-gray-200 p-4 z-30 animate-slide-up">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">À partir de</p>
          <p className="text-2xl font-bold text-blue-600">{formatPrice(price)}€</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSelectAirport}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-xl font-medium whitespace-nowrap"
          >
            <Plane className="w-4 h-4" />
            {selectedAirport ? selectedAirport.code : "Choisir"}
          </button>

          <button
            onClick={onBook}
            disabled={!selectedAirport}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
}