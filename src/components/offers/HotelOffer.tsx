import React from 'react';
import { Star, MapPin, Wifi, Coffee, UtensilsCrossed, Waves, Dumbbell, Heart } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Amenity {
  icon: React.ElementType;
  name: string;
  description: string;
}

interface NearbyAttraction {
  name: string;
  distance: string;
  description: string;
  type: string;
}

interface HotelOfferProps {
  hotel: {
    name: string;
    rating: number;
    location: {
      address: string;
      coordinates: [number, number];
    };
    price: number;
    description: string;
    amenities: string[];
    images: string[];
    nearbyAttractions: NearbyAttraction[];
    peakSeasons: {
      period: string;
      description: string;
    }[];
    travelTips: string[];
  };
}

const amenitiesMap: Record<string, Amenity> = {
  wifi: { icon: Wifi, name: 'Wi-Fi Gratuit', description: 'Connexion haut débit dans tout l\'établissement' },
  breakfast: { icon: Coffee, name: 'Petit-déjeuner', description: 'Buffet continental inclus' },
  restaurant: { icon: UtensilsCrossed, name: 'Restaurant', description: 'Restaurant gastronomique sur place' },
  pool: { icon: Waves, name: 'Piscine', description: 'Piscine extérieure chauffée' },
  gym: { icon: Dumbbell, name: 'Salle de sport', description: 'Équipement moderne et cours collectifs' },
  spa: { icon: Heart, name: 'Spa', description: 'Massages et soins disponibles' }
};

export default function HotelOffer({ hotel }: HotelOfferProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 text-white mb-4">
                {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
                ))}
                <span className="ml-2 text-white/90">{hotel.rating} étoiles</span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{hotel.name}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5" />
                <span>{hotel.location.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-6">À propos de l'hôtel</h2>
              <p className="text-gray-600 leading-relaxed">{hotel.description}</p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Services et Équipements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotel.amenities.map((amenityKey) => {
                  const amenity = amenitiesMap[amenityKey];
                  if (!amenity) return null;
                  const Icon = amenity.icon;
                  return (
                    <div key={amenityKey} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{amenity.name}</h3>
                        <p className="text-sm text-gray-600">{amenity.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Map */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Emplacement</h2>
              <div className="h-[400px] rounded-xl overflow-hidden shadow-lg">
                <MapContainer
                  center={hotel.location.coordinates}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={hotel.location.coordinates}>
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-semibold">{hotel.name}</h3>
                        <p className="text-sm">{hotel.location.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </section>

            {/* Nearby Attractions */}
            <section>
              <h2 className="text-2xl font-bold mb-6">À proximité</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {hotel.nearbyAttractions.map((attraction, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold">{attraction.name}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                        {attraction.distance}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{attraction.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">À partir de</p>
                <p className="text-3xl font-bold text-blue-600">{hotel.price}€</p>
                <p className="text-sm text-gray-600">par nuit</p>
              </div>
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                Réserver maintenant
              </button>
            </div>

            {/* Peak Seasons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold mb-4">Périodes Touristiques</h3>
              <div className="space-y-4">
                {hotel.peakSeasons.map((season, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <h4 className="font-medium mb-2">{season.period}</h4>
                    <p className="text-sm text-gray-600">{season.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Travel Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold mb-4">Conseils Voyage</h3>
              <ul className="space-y-3">
                {hotel.travelTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-sm text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}