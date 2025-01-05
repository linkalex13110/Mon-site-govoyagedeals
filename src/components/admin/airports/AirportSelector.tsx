import React from 'react';
import { useAirports } from '../../../hooks/useAirports';
import { Airport } from '../../../services/airports.service';
import { Plane } from 'lucide-react';

interface AirportSelectorProps {
  value?: string;
  onChange: (airport: Airport) => void;
  label: string;
}

export default function AirportSelector({ value, onChange, label }: AirportSelectorProps) {
  const { data: airports, isLoading } = useAirports();

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Plane className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <select
          value={value}
          onChange={(e) => {
            const airport = airports?.find(a => a.code === e.target.value);
            if (airport) onChange(airport);
          }}
          className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Sélectionner un aéroport</option>
          {airports?.map((airport) => (
            <option key={airport.code} value={airport.code}>
              {airport.city} - {airport.name} ({airport.code})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}