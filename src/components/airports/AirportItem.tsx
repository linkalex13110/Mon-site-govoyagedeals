import React from 'react';
import { Plane } from 'lucide-react';
import { Airport } from '../../data/airports';

interface AirportItemProps {
  airport: Airport;
  onSelect: (airport: Airport) => void;
}

export default function AirportItem({ airport, onSelect }: AirportItemProps) {
  return (
    <button
      onClick={() => onSelect(airport)}
      className="flex items-center gap-3 w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
    >
      <Plane className="w-5 h-5 text-gray-400" />
      <div>
        <p className="font-medium text-gray-900">{airport.city}</p>
        <p className="text-sm text-gray-500">{airport.code} - {airport.name}</p>
      </div>
    </button>
  );
}