import React from 'react';
import { Wifi, Coffee, UtensilsCrossed, Waves, Dumbbell, Languages, Clock } from 'lucide-react';

interface Amenity {
  name: string;
  description: string;
}

interface HotelAmenitiesProps {
  amenities: {
    general: Amenity[];
    languages: string[];
    schedules: {
      checkIn: string;
      checkOut: string;
      restaurant: string;
    };
  };
}

export default function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  return (
    <div className="space-y-8">
      {/* Équipements généraux */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Équipements et services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {amenities.general.map((amenity, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wifi className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{amenity.name}</h3>
                <p className="text-sm text-gray-600">{amenity.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Langues parlées */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Languages className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Langues parlées</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {amenities.languages.map((language, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      {/* Horaires */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Horaires</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold mb-2">Check-in / Check-out</h3>
            <p className="text-sm text-gray-600">Arrivée : {amenities.schedules.checkIn}</p>
            <p className="text-sm text-gray-600">Départ : {amenities.schedules.checkOut}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="font-semibold mb-2">Restaurant</h3>
            <p className="text-sm text-gray-600">{amenities.schedules.restaurant}</p>
          </div>
        </div>
      </div>
    </div>
  );
}