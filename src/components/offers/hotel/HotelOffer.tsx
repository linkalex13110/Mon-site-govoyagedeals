import React from 'react';
import { Offer } from '../../../services/offers/types';
import Navigation from '../../Navigation';
import Footer from '../../Footer';
import HotelHeader from './sections/HotelHeader';
import HotelDescription from './sections/HotelDescription';
import HotelAmenities from './sections/HotelAmenities';
import HotelLocation from './sections/HotelLocation';
import HotelNearby from './sections/HotelNearby';
import HotelBooking from './sections/HotelBooking';

interface HotelOfferProps {
  offer: Offer;
}

export default function HotelOffer({ offer }: HotelOfferProps) {
  const hotelData = {
    amenities: {
      general: [
        { name: 'WiFi Gratuit', description: 'Connexion haut débit dans tout l\'établissement' },
        { name: 'Petit-déjeuner', description: 'Buffet continental inclus' },
        { name: 'Restaurant', description: 'Restaurant gastronomique sur place' },
        { name: 'Spa', description: 'Massages et soins disponibles' },
        { name: 'Salle de sport', description: 'Équipement moderne et cours collectifs' },
        { name: 'Piscine', description: 'Piscine intérieure chauffée' }
      ],
      languages: ['Français', 'Anglais', 'Espagnol', 'Italien'],
      schedules: {
        checkIn: '15:00',
        checkOut: '12:00',
        restaurant: '7:00 - 22:30'
      }
    },
    location: {
      address: 'Westminster, Londres SW1H 0TH, Royaume-Uni',
      coordinates: [51.499453838285056, -0.13858714298193955] as [number, number],
      transport: {
        fromAirport: 'Navette aéroport toutes les 30 minutes',
        fromStation: 'Gare de St. Pancras à 10 minutes en métro',
        publicTransport: [
          'Métro : Station St. James\'s Park (Circle, District)',
          'Bus : Lignes 11, 24, 148'
        ]
      }
    },
    nearby: {
      restaurants: [
        { name: 'The Goring Dining Room', distance: '400m', description: 'Restaurant étoilé Michelin', priceRange: '€€€€' },
        { name: 'Bistrot Bleu', distance: '600m', description: 'Cuisine française traditionnelle', priceRange: '€€€' }
      ],
      attractions: [
        { name: 'Buckingham Palace', distance: '800m', description: 'Résidence officielle de la famille royale' },
        { name: 'Westminster Abbey', distance: '500m', description: 'Église gothique historique' }
      ],
      activities: [
        { name: 'St. James\'s Park', distance: '300m', description: 'Parc royal avec lac et pelouses' },
        { name: 'Victoria Palace Theatre', distance: '700m', description: 'Théâtre victorien historique' }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <HotelHeader 
        title={offer.title}
        image={offer.image_url}
        location={hotelData.location.address}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            <HotelDescription description={offer.description} />
            <HotelAmenities amenities={hotelData.amenities} />
            <HotelLocation {...hotelData.location} />
            <HotelNearby {...hotelData.nearby} />
          </div>

          {/* Right Column */}
          <div>
            <HotelBooking price={offer.price} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}