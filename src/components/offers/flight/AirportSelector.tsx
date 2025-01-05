import React from 'react';
import { Plane } from 'lucide-react';
import { FRENCH_AIRPORTS } from '../../../data/airports';
import type { Airport } from '../../../data/airports';

interface AirportSelectorProps {
  availableAirports: string[];
  onSelect: (airport: Airport) => void;
  onClose: () => void;
}

export default function AirportSelector({ availableAirports, onSelect, onClose }: AirportSelectorProps) {
  const airports = FRENCH_AIRPORTS.filter(airport => 
    availableAirports.includes(airport.code)
  );

  if (!airports.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        Aucun aéroport disponible pour cette offre
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Plane className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold">Choisir votre aéroport de départ</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {airports.map((airport) => (
            <button
              key={airport.code}
              onClick={() => onSelect(airport)}
              className="p-4 text-left border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <Plane className="w-4 h-4 text-gray-500" />
                <span className="font-medium">{airport.city}</span>
              </div>
              <p className="text-sm text-gray-600">{airport.name}</p>
              <span className="text-xs text-blue-600 mt-1">{airport.code}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}