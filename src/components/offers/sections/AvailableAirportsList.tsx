import React from 'react';
import { Plane } from 'lucide-react';
import { FRENCH_AIRPORTS } from '../../../data/airports';

interface AvailableAirportsListProps {
  airportCodes: string[];
}

export default function AvailableAirportsList({ airportCodes }: AvailableAirportsListProps) {
  const airports = FRENCH_AIRPORTS.filter(airport => 
    airportCodes.includes(airport.code)
  );

  if (!airports.length) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center gap-2 text-gray-900 mb-3">
        <Plane className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium">Aéroports de départ disponibles :</h3>
      </div>
      <ul className="space-y-2">
        {airports.map((airport) => (
          <li key={airport.code} className="flex items-center gap-2 text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            {airport.city} ({airport.code}) - {airport.name}
          </li>
        ))}
      </ul>
    </div>
  );
}