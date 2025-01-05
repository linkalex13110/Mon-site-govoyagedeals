import React from 'react';
import { formatPrice } from '../../utils/format';

interface OfferStickyBarProps {
  price: number;
  onBook: () => void;
}

export default function OfferStickyBar({ price, onBook }: OfferStickyBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 p-4 z-50">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">À partir de</p>
          <p className="text-xl font-bold text-blue-600">{formatPrice(price)}€</p>
        </div>
        <button
          onClick={onBook}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Réserver
        </button>
      </div>
    </div>
  );
}