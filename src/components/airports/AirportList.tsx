import React from 'react';
import { Plane } from 'lucide-react';
import { Airport, FRENCH_AIRPORTS } from '../../data/airports';
import AirportItem from './AirportItem';

interface AirportListProps {
  availableAirports: string[];
  onSelect: (airport: Airport) => void;
}

export default function AirportList({ availableAirports, onSelect }: AirportListProps) {
  const airports = FRENCH_AIRPORTS.filter(airport => 
    availableAirports.includes(airport.code)
  );

  return (
    <div className="grid gap-1">
      {airports.map((airport) => (
        <AirportItem
          key={airport.code}
          airport={airport}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}