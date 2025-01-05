import React from 'react';
import { Plane, Clock } from 'lucide-react';

interface FlightSegment {
  date: string;
  time: string;
  airport: string;
  airline: string;
}

interface FlightInfo {
  departure: FlightSegment;
  arrival: FlightSegment;
  duration: string;
}

interface FlightDetailsProps {
  outbound: FlightInfo;
  return?: FlightInfo;
}

export default function FlightDetails({ outbound, return: returnFlight }: FlightDetailsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Détails du vol</h2>
      
      {/* Vol aller */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4">Vol aller</h3>
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Départ */}
            <div>
              <p className="text-2xl font-bold">{outbound.departure.time}</p>
              <p className="text-gray-600">{outbound.departure.airport}</p>
              <p className="text-sm text-gray-500">{outbound.departure.date}</p>
            </div>

            {/* Durée */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{outbound.duration}</span>
              </div>
              <div className="w-24 h-px bg-gray-300 relative my-2">
                <Plane className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500">{outbound.departure.airline}</p>
            </div>

            {/* Arrivée */}
            <div className="text-right">
              <p className="text-2xl font-bold">{outbound.arrival.time}</p>
              <p className="text-gray-600">{outbound.arrival.airport}</p>
              <p className="text-sm text-gray-500">{outbound.arrival.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vol retour */}
      {returnFlight && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Vol retour</h3>
          <div className="p-6 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Départ */}
              <div>
                <p className="text-2xl font-bold">{returnFlight.departure.time}</p>
                <p className="text-gray-600">{returnFlight.departure.airport}</p>
                <p className="text-sm text-gray-500">{returnFlight.departure.date}</p>
              </div>

              {/* Durée */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{returnFlight.duration}</span>
                </div>
                <div className="w-24 h-px bg-gray-300 relative my-2">
                  <Plane className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-blue-600 rotate-180" />
                </div>
                <p className="text-sm text-gray-500">{returnFlight.departure.airline}</p>
              </div>

              {/* Arrivée */}
              <div className="text-right">
                <p className="text-2xl font-bold">{returnFlight.arrival.time}</p>
                <p className="text-gray-600">{returnFlight.arrival.airport}</p>
                <p className="text-sm text-gray-500">{returnFlight.arrival.date}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}