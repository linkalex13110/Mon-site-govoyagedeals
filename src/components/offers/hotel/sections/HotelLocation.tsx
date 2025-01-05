import React from 'react';
import { MapPin, Train, Plane, Bus } from 'lucide-react';

interface HotelLocationProps {
  address: string;
  coordinates: [number, number];
  transport: {
    fromAirport: string;
    fromStation: string;
    publicTransport: string[];
  };
}

export default function HotelLocation({ address, coordinates, transport }: HotelLocationProps) {
  return (
    <div className="space-y-8">
      {/* Carte */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-[400px]">
          <iframe 
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4967.50013231144!2d${coordinates[1]}!3d${coordinates[0]}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM1!5e0!3m2!1sfr!2sfr!4v1735806536482!5m2!1sfr!2sfr`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Informations d'accès */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Comment nous rejoindre</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plane className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Depuis l'aéroport</h3>
              <p className="text-gray-600">{transport.fromAirport}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Train className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Depuis la gare</h3>
              <p className="text-gray-600">{transport.fromStation}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Transports en commun</h3>
              <ul className="space-y-2">
                {transport.publicTransport.map((transport, index) => (
                  <li key={index} className="text-gray-600">{transport}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}