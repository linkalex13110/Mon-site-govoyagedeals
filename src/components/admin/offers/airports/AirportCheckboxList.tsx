import React from 'react';
import { FRENCH_AIRPORTS } from '../../../../data/airports';
import { Plane } from 'lucide-react';

interface AirportCheckboxListProps {
  selectedAirports: string[];
  onChange: (airports: string[]) => void;
}

export default function AirportCheckboxList({ selectedAirports, onChange }: AirportCheckboxListProps) {
  const handleToggleAirport = (code: string) => {
    const newSelection = selectedAirports.includes(code)
      ? selectedAirports.filter(airport => airport !== code)
      : [...selectedAirports, code];
    onChange(newSelection);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {FRENCH_AIRPORTS.map((airport) => (
        <label
          key={airport.code}
          className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${
            selectedAirports.includes(airport.code)
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="checkbox"
            checked={selectedAirports.includes(airport.code)}
            onChange={() => handleToggleAirport(airport.code)}
            className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <Plane className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{airport.city}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{airport.name}</p>
            <span className="text-xs text-blue-600 mt-1">{airport.code}</span>
          </div>
        </label>
      ))}
    </div>
  );
}