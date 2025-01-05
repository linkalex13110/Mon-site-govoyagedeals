import React from 'react';
import AirportSelector from '../airports/AirportSelector';
import { Airport } from '../../../services/airports.service';

interface FlightDetailsFormProps {
  onDepartureChange: (airport: Airport) => void;
  onArrivalChange: (airport: Airport) => void;
  departureCode?: string;
  arrivalCode?: string;
}

export default function FlightDetailsForm({
  onDepartureChange,
  onArrivalChange,
  departureCode,
  arrivalCode
}: FlightDetailsFormProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Détails du vol</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AirportSelector
          label="Aéroport de départ"
          value={departureCode}
          onChange={onDepartureChange}
        />
        
        <AirportSelector
          label="Aéroport d'arrivée"
          value={arrivalCode}
          onChange={onArrivalChange}
        />
      </div>
    </div>
  );
}