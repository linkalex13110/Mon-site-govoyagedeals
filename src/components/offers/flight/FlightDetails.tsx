import React from 'react';
import { Clock } from 'lucide-react';
import { Schedule } from './FlightSchedule';

interface FlightSegment {
  date: string;
  time: string;
  airport: string;
  airline?: string;
}

interface FlightInfo {
  departure: FlightSegment;
  arrival: FlightSegment;
  duration: string;
}

interface FlightDetailProps {
  flight: FlightInfo;
  type: 'outbound' | 'return';
}

function FlightDetail({ flight, type }: FlightDetailProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-semibold text-lg">
          {type === 'outbound' ? 'Vol aller' : 'Vol retour'}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Schedule {...flight.departure} />
        
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{flight.duration}</span>
          </div>
          {flight.departure.airline && (
            <p className="text-sm text-gray-500 mt-2">{flight.departure.airline}</p>
          )}
        </div>

        <Schedule {...flight.arrival} />
      </div>
    </div>
  );
}

interface FlightDetailsContainerProps {
  outbound: FlightInfo;
  return?: FlightInfo;
}

export default function FlightDetailsContainer({ outbound, return: returnFlight }: FlightDetailsContainerProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Détails du vol</h2>
      <FlightDetail flight={outbound} type="outbound" />
      {returnFlight && <FlightDetail flight={returnFlight} type="return" />}
    </div>
  );
}