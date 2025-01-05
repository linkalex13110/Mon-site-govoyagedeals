import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { Offer } from '../../../services/offers/types';
import Navigation from '../../Navigation';
import Footer from '../../Footer';
import PackageDescription from './sections/PackageDescription';
import PackageItinerary from './sections/PackageItinerary';
import PackageInclusions from './sections/PackageInclusions';
import PackageBooking from './sections/PackageBooking';
import type { Airport } from '../../../data/airports';

interface PackageOfferProps {
  offer: Offer;
}

export default function PackageOffer({ offer }: PackageOfferProps) {
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);

  const itinerary = [
    {
      day: 1,
      title: "Arrivée et installation",
      description: "Accueil à l'aéroport, transfert et installation à l'hôtel. Temps libre pour découvrir les environs.",
      activities: ["Transfert aéroport-hôtel", "Check-in à l'hôtel", "Cocktail de bienvenue"]
    },
    {
      day: 2,
      title: "Découverte de la ville",
      description: "Visite guidée des principaux monuments et quartiers historiques.",
      activities: ["Visite guidée", "Déjeuner traditionnel", "Temps libre"]
    },
    {
      day: 3,
      title: "Excursion nature",
      description: "Journée d'excursion dans les environs pour découvrir les paysages naturels.",
      activities: ["Randonnée guidée", "Pique-nique", "Observation de la faune"]
    }
  ];

  const inclusions = {
    included: [
      "Vols A/R",
      "Transferts aéroport",
      "Hébergement en hôtel 4★",
      "Petit-déjeuner buffet",
      "Guide francophone",
      "Excursions mentionnées"
    ],
    notIncluded: [
      "Assurance voyage",
      "Dépenses personnelles",
      "Pourboires",
      "Repas non mentionnés"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={offer.image_url}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 text-white/90 mb-4">
                <span className="bg-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                  SÉJOURS ✈️🌴
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{offer.title}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            <PackageDescription description={offer.description} />
            <PackageItinerary itinerary={itinerary} />
            <PackageInclusions {...inclusions} />
          </div>

          {/* Right Column */}
          <div>
            <PackageBooking 
              price={offer.price}
              availableAirports={offer.availableAirports}
              airportBookingLinks={offer.airportBookingLinks}
              selectedAirport={selectedAirport}
              onAirportSelect={setSelectedAirport}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}