import React from 'react';
import { Plane } from 'lucide-react';
import type { Airport } from '../../data/airports';

interface SelectedAirportProps {
  airport: Airport;
  onChangeClick: () => void;
}

export default function SelectedAirport({ airport, onChangeClick }: SelectedAirportProps) {
  return (
    <div className="p-4 bg-blue-50 rounded-xl">
      <div className="flex items-center gap-2 text-blue-600 mb-2">
        <Plane className="w-4 h-4" />
        <span className="font-medium">Départ de :</span>
      </div>
      <p className="text-gray-900 font-medium">{airport.name}</p>
      <p className="text-sm text-gray-600">
        {airport.city} ({airport.code})
      </p>
      <button
        onClick={onChangeClick}
        className="text-sm text-blue-600 hover:text-blue-700 mt-2"
      >
        Changer d'aéroport
      </button>
    </div>
  );
}