import React, { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import { Offer } from '../../../services/offers/types';
import Navigation from '../../Navigation';
import Footer from '../../Footer';
import FlightDetails from './sections/FlightDetails';
import FlightOtherDates from './sections/FlightOtherDates';
import FlightBooking from './sections/FlightBooking';
import FlightBaggage from './sections/FlightBaggage';
import OfferDescription from '../sections/OfferDescription';

interface FlightOfferProps {
  offer: Offer;
}

export default function FlightOffer({ offer }: FlightOfferProps) {
  const [selectedAirport, setSelectedAirport] = useState<string | null>(null);

  const flightInfo = {
    outbound: {
      departure: {
        date: "21 janvier 2024",
        time: "10:30",
        airport: "Paris Charles de Gaulle (CDG)",
        airline: "Air France"
      },
      arrival: {
        date: "21 janvier 2024",
        time: "12:45",
        airport: "London Heathrow (LHR)",
        airline: "Air France"
      },
      duration: "2h15"
    },
    return: {
      departure: {
        date: "28 janvier 2024",
        time: "14:30",
        airport: "London Heathrow (LHR)",
        airline: "Air France"
      },
      arrival: {
        date: "28 janvier 2024",
        time: "16:45",
        airport: "Paris Charles de Gaulle (CDG)",
        airline: "Air France"
      },
      duration: "2h15"
    }
  };

  const otherDates = [
    {
      startDate: "19/02",
      endDate: "22/02",
      price: 299,
      url: "#"
    },
    {
      startDate: "26/02",
      endDate: "29/02",
      price: 349,
      url: "#"
    },
    {
      startDate: "04/03",
      endDate: "07/03",
      price: 279,
      url: "#"
    }
  ];

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
                  VOLS ✈️
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
            <OfferDescription 
              description={offer.description} 
              availableAirports={offer.availableAirports}
            />
            <FlightDetails outbound={flightInfo.outbound} return={flightInfo.return} />
            {offer.baggage && <FlightBaggage baggage={offer.baggage} />}
            <FlightOtherDates dates={otherDates} />
          </div>

          {/* Right Column */}
          <div>
            <FlightBooking 
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