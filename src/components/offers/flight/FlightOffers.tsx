import React, { useState } from 'react';
import { useOffersSync } from '../../../hooks/useOffersSync';
import AirportSelector from './AirportSelector';
import FlightOffer from './FlightOffer';

interface Airport {
  code: string;
  name: string;
  city: string;
}

export default function FlightOffers() {
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const { offers } = useOffersSync();

  // Filtrer les offres de vols
  const flightOffers = offers.filter(offer => 
    offer.category === 'VOLS' && 
    offer.status === 'active'
  );

  if (!selectedAirport) {
    return (
      <div className="container mx-auto px-6 py-12">
        <AirportSelector onSelect={setSelectedAirport} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <button
          onClick={() => setSelectedAirport(null)}
          className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
        >
          ← Changer d'aéroport
        </button>
        <h2 className="text-2xl font-bold mt-4">
          Vols au départ de {selectedAirport.name} ({selectedAirport.code})
        </h2>
      </div>

      <div className="space-y-8">
        {flightOffers.map((offer) => (
          <FlightOffer key={offer.id} flight={offer} />
        ))}
      </div>
    </div>
  );
}