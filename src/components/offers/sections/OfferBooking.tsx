import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import type { Airport } from '../../../data/airports';
import type { AirportBookingLink, Offer } from '../../../services/offers/types';
import AirportSelectionModal from '../../airports/AirportSelectionModal';
import SelectedAirport from '../../airports/SelectedAirport';

interface OfferBookingProps {
  price: number;
  availableAirports: string[];
  airportBookingLinks: AirportBookingLink[];
  offer: Offer;
  selectedAirport: Airport | null;
  onAirportSelect: (airport: Airport) => void;
  onBook: () => void;
}

export default function OfferBooking({ 
  price, 
  availableAirports,
  airportBookingLinks,
  offer,
  selectedAirport,
  onAirportSelect,
  onBook
}: OfferBookingProps) {
  const [showAirportModal, setShowAirportModal] = useState(false);
  const isHotelOffer = offer.category === 'HÔTELS';

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">À partir de</p>
          <p className="text-3xl font-bold text-blue-600">{formatPrice(price)}€</p>
          <p className="text-sm text-gray-600">par personne</p>
        </div>

        {!isHotelOffer && (
          <>
            {selectedAirport ? (
              <div className="mb-6">
                <SelectedAirport
                  airport={selectedAirport}
                  onChangeClick={() => setShowAirportModal(true)}
                />
              </div>
            ) : (
              <button
                onClick={() => setShowAirportModal(true)}
                className="w-full px-6 py-3 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200 transition-colors mb-6"
              >
                Choisir l'aéroport de départ
              </button>
            )}
          </>
        )}

        <button
          onClick={onBook}
          className={`w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold transition-colors mb-6 ${
            !isHotelOffer && !selectedAirport ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
          }`}
          disabled={!isHotelOffer && !selectedAirport}
        >
          Réserver maintenant
        </button>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Réservation sécurisée</h3>
              <p className="text-sm text-gray-600">
                Nous ne collectons aucune donnée, les réservations sont traitées directement par nos partenaires.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Conditions flexibles</h3>
              <p className="text-sm text-gray-600">
                Annulation gratuite jusqu'à 48h avant le départ
              </p>
            </div>
          </div>
        </div>

        {!isHotelOffer && (
          <AirportSelectionModal
            isOpen={showAirportModal}
            onClose={() => setShowAirportModal(false)}
            availableAirports={availableAirports}
            onSelect={(airport) => {
              onAirportSelect(airport);
              setShowAirportModal(false);
            }}
          />
        )}
      </div>
    </div>
  );
}