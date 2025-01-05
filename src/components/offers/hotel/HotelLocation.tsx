import React from 'react';
import { MapPin, Train, Plane, Bus } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface HotelLocationProps {
  location: {
    address: string;
    coordinates: [number, number];
  };
  accessInfo: {
    fromAirport: string;
    fromStation: string;
    publicTransport: string[];
  };
  pointsOfInterest: Array<{
    name: string;
    distance: string;
    type: string;
  }>;
}

export default function HotelLocation({ location, accessInfo, pointsOfInterest }: HotelLocationProps) {
  return (
    <div className="space-y-8">
      {/* Carte */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-[400px]">
          <MapContainer
            center={location.coordinates}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={location.coordinates}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">Notre hôtel</h3>
                  <p className="text-sm">{location.address}</p>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
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
              <p className="text-gray-600">{accessInfo.fromAirport}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Train className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Depuis la gare</h3>
              <p className="text-gray-600">{accessInfo.fromStation}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Transports en commun</h3>
              <ul className="space-y-2">
                {accessInfo.publicTransport.map((transport, index) => (
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