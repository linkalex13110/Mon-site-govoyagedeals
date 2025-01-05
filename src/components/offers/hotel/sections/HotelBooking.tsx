import React from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { formatPrice } from '../../../../utils/format';

interface HotelBookingProps {
  price: number;
}

export default function HotelBooking({ price }: HotelBookingProps) {
  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">À partir de</p>
          <p className="text-3xl font-bold text-blue-600">{formatPrice(price)}€</p>
          <p className="text-sm text-gray-600">par nuit</p>
        </div>

        <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-6">
          Réserver maintenant
        </button>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Réservation sécurisée</h3>
              <p className="text-sm text-gray-600">
                Paiement sécurisé et confirmation immédiate
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Conditions flexibles</h3>
              <p className="text-sm text-gray-600">
                Annulation gratuite jusqu'à 48h avant l'arrivée
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}