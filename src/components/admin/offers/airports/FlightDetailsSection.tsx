import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import AirportCheckboxList from './AirportCheckboxList';

interface FlightDetailsSectionProps {
  register: UseFormRegister<any>;
  selectedAirports: string[];
  onAirportsChange: (airports: string[]) => void;
}

export default function FlightDetailsSection({ 
  register, 
  selectedAirports,
  onAirportsChange 
}: FlightDetailsSectionProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-xl space-y-4">
      <h3 className="font-medium text-gray-900">Détails du vol</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Aéroports de départ disponibles
        </label>
        <p className="text-sm text-gray-500 mb-3">
          Sélectionnez les aéroports disponibles pour cette offre
        </p>
        <AirportCheckboxList
          selectedAirports={selectedAirports}
          onChange={onAirportsChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bagages inclus
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('baggage.handBaggage.included')}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Bagage à main</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('baggage.cabinBaggage.included')}
              className="rounded border-gray-300"
            />
            <span className="text-sm">Bagage en soute</span>
          </label>
        </div>
      </div>
    </div>
  );
}