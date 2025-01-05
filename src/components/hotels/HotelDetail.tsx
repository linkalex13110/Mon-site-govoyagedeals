import React from 'react';
import HotelHeader from './sections/HotelHeader';
import HotelDescription from './sections/HotelDescription';
import HotelAmenities from './sections/HotelAmenities';
import HotelLocation from './sections/HotelLocation';
import HotelNearby from './sections/HotelNearby';
import HotelBooking from './sections/HotelBooking';

export interface Hotel {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  rating: number;
  address: string;
  coordinates: [number, number];
  amenities: {
    general: string[];
    room: string[];
    wellness: string[];
  };
  rooms: Array<{
    type: string;
    description: string;
    price: number;
    capacity: number;
  }>;
  nearbyPlaces: Array<{
    name: string;
    type: 'attraction' | 'restaurant' | 'shopping' | 'culture' | 'park';
    distance: number;
    walkingTime: number;
    description: string;
  }>;
  transport: {
    airport: string;
    train: string;
    bus: string[];
    metro: string[];
  };
}

export default function HotelDetail() {
  // Exemple de données - À remplacer par les vraies données
  const hotel: Hotel = {
    id: '1',
    name: 'Hôtel Luxe Paris',
    description: 'Un établissement de luxe au cœur de Paris...',
    price: 250,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd',
    ],
    rating: 4.8,
    address: '1 Rue de la Paix, 75002 Paris',
    coordinates: [48.8691, 2.3322],
    amenities: {
      general: ['WiFi gratuit', 'Réception 24/7', 'Conciergerie'],
      room: ['Climatisation', 'Coffre-fort', 'Mini-bar'],
      wellness: ['Spa', 'Salle de sport', 'Piscine intérieure']
    },
    rooms: [
      {
        type: 'Chambre Deluxe',
        description: 'Chambre spacieuse avec vue sur la ville',
        price: 250,
        capacity: 2
      }
    ],
    nearbyPlaces: [
      {
        name: 'Musée du Louvre',
        type: 'culture',
        distance: 0.8,
        walkingTime: 10,
        description: 'Le plus grand musée d\'art au monde'
      }
    ],
    transport: {
      airport: 'Navette aéroport toutes les 30 minutes',
      train: 'Gare du Nord à 2km',
      bus: ['Ligne 20', 'Ligne 30'],
      metro: ['Ligne 1', 'Ligne 8']
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HotelHeader hotel={hotel} />
      
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-12">
            <HotelDescription hotel={hotel} />
            <HotelAmenities amenities={hotel.amenities} />
            <HotelLocation 
              address={hotel.address}
              coordinates={hotel.coordinates}
              transport={hotel.transport}
            />
            <HotelNearby places={hotel.nearbyPlaces} />
          </div>

          {/* Colonne latérale */}
          <div>
            <HotelBooking 
              price={hotel.price}
              rooms={hotel.rooms}
            />
          </div>
        </div>
      </div>
    </div>
  );
}