import React from 'react';
import { Plane } from 'lucide-react';
import { FRENCH_AIRPORTS } from '../../../data/airports';

interface OfferDescriptionProps {
  description: string;
  availableAirports: string[];
}

export default function OfferDescription({ description, availableAirports }: OfferDescriptionProps) {
  const airports = FRENCH_AIRPORTS.filter(airport => 
    availableAirports.includes(airport.code)
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Description</h2>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 leading-relaxed">{description}</p>
        
        {airports.length > 0 && (
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
        )}
      </div>
    </div>
  );
}