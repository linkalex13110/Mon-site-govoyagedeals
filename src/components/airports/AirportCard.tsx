import React from 'react';
import { Plane } from 'lucide-react';
import type { Airport } from '../../data/airports';

interface AirportCardProps {
  airport: Airport;
  onClick: () => void;
}

export default function AirportCard({ airport, onClick }: AirportCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-start gap-4 p-4 w-full text-left border border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
    >
      <div className="p-2 bg-blue-100 rounded-lg">
        <Plane className="w-5 h-5 text-blue-600" />
      </div>
      <div>
        <h3 className="font-medium">{airport.city}</h3>
        <p className="text-sm text-gray-600">{airport.name}</p>
        <span className="text-xs text-blue-600 mt-1">{airport.code}</span>
      </div>
    </button>
  );
}