import React, { useState } from 'react';
import { Shield, AlertCircle, Plane } from 'lucide-react';
import { formatPrice } from '../../../../utils/format';
import { AirportBookingLink } from '../../../../services/offers/types';
import AirportSelectionModal from '../../../airports/AirportSelectionModal';
import type { Airport } from '../../../../data/airports';

interface FlightBookingProps {
  price: number;
  availableAirports: string[];
  airportBookingLinks: AirportBookingLink[];
  selectedAirport: Airport | null;
  onAirportSelect: (airport: Airport) => void;
}

export default function FlightBooking({ 
  price, 
  availableAirports,
  airportBookingLinks,
  selectedAirport,
  onAirportSelect
}: FlightBookingProps) {
  const [showAirportModal, setShowAirportModal] = useState(false);

  const getBookingUrl = () => {
    if (!selectedAirport) return '';
    const link = airportBookingLinks.find(link => link.airportCode === selectedAirport.code);
    return link?.bookingUrl || '';
  };

  return (
    <div className="sticky top-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600">À partir de</p>
          <p className="text-3xl font-bold text-blue-600">{formatPrice(price)}€</p>
          <p className="text-sm text-gray-600">par personne</p>
        </div>

        {selectedAirport ? (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <Plane className="w-4 h-4" />
              <span className="font-medium">Départ de :</span>
            </div>
            <p className="text-gray-900 font-medium">{selectedAirport.name}</p>
            <p className="text-sm text-gray-600">{selectedAirport.city} ({selectedAirport.code})</p>
            <button
              onClick={() => setShowAirportModal(true)}
              className="text-sm text-blue-600 hover:text-blue-700 mt-2"
            >
              Changer d'aéroport
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAirportModal(true)}
            className="w-full px-6 py-3 bg-blue-100 text-blue-600 rounded-xl font-semibold hover:bg-blue-200 transition-colors mb-6"
          >
            Choisir l'aéroport de départ
          </button>
        )}

        <a
          href={getBookingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold transition-colors mb-6 block text-center ${
            selectedAirport && getBookingUrl() 
              ? 'hover:bg-blue-700' 
              : 'opacity-50 cursor-not-allowed'
          }`}
          onClick={(e) => {
            if (!selectedAirport || !getBookingUrl()) {
              e.preventDefault();
            }
          }}
        >
          Réserver maintenant
        </a>

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
                Annulation gratuite jusqu'à 48h avant le départ
              </p>
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
    </div>
  );
}