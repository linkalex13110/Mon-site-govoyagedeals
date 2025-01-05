import React from 'react';
import { Plane } from 'lucide-react';
import { FRENCH_AIRPORTS } from '../../../data/airports';

interface AvailableAirportsProps {
  airportCodes: string[];
}

export default function AvailableAirports({ airportCodes }: AvailableAirportsProps) {
  const availableAirports = FRENCH_AIRPORTS.filter(airport => 
    airportCodes.includes(airport.code)
  );

  if (!availableAirports.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Plane className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Aéroports de départ disponibles</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {availableAirports.map((airport) => (
          <div
            key={airport.code}
            className="p-4 bg-gray-50 rounded-xl border border-gray-100"
          >
            <div className="flex items-center gap-2 mb-1">
              <Plane className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{airport.city}</span>
            </div>
            <p className="text-sm text-gray-600">{airport.name}</p>
            <span className="text-xs text-blue-600 mt-1">{airport.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}