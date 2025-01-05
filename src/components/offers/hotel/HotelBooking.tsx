import React from 'react';
import { formatPrice } from '../../../utils/format';

interface HotelBookingProps {
  price: number;
}

export default function HotelBooking({ price }: HotelBookingProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-6">
      <div className="text-center mb-6">
        <p className="text-sm text-gray-600">À partir de</p>
        <p className="text-3xl font-bold text-blue-600">{formatPrice(price)}€</p>
        <p className="text-sm text-gray-600">par nuit</p>
      </div>

      <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
        Réserver maintenant
      </button>
    </div>
  );
}