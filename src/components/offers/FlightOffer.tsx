import React from 'react';
import { Plane, Clock, Calendar, Luggage, Info, Sun, Cloud, Umbrella, ThermometerSun, MapPin, AlertTriangle, DollarSign } from 'lucide-react';

interface WeatherData {
  season: string;
  temperature: string;
  precipitation: string;
  description: string;
  icon: React.ElementType;
}

interface Airline {
  name: string;
  logo: string;
  rating: number;
}

interface FlightDetails {
  departure: {
    time: string;
    airport: string;
    terminal: string;
  };
  arrival: {
    time: string;
    airport: string;
    terminal: string;
  };
  duration: string;
  airline: Airline;
}

interface BaggageInfo {
  cabin: string;
  checked: string;
  restrictions: string[];
}

interface FlightOfferProps {
  flight: {
    id: string;
    price: number;
    outbound: FlightDetails;
    return?: FlightDetails;
    baggage: BaggageInfo;
    features: string[];
    peakSeasons: {
      period: string;
      description: string;
      rating: 'ideal' | 'moderate' | 'avoid';
    }[];
    travelTips: string[];
    destination: {
      name: string;
      description: string;
      attractions: {
        name: string;
        description: string;
        distance: string;
      }[];
      practicalInfo: {
        visa: string;
        currency: string;
        language: string;
        timeZone: string;
        health: string[];
      };
    };
    weather: WeatherData[];
  };
}

function WeatherTable({ data }: { data: WeatherData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((season) => {
        const Icon = season.icon;
        return (
          <div key={season.season} className="bg-white/50 backdrop-blur-sm rounded-xl p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h4 className="font-medium">{season.season}</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <ThermometerSun className="w-4 h-4" />
                {season.temperature}
              </p>
              <p className="flex items-center gap-2">
                <Umbrella className="w-4 h-4" />
                {season.precipitation}
              </p>
              <p className="text-xs text-gray-500">{season.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SeasonBadge({ rating }: { rating: 'ideal' | 'moderate' | 'avoid' }) {
  const colors = {
    ideal: 'bg-green-100 text-green-700',
    moderate: 'bg-yellow-100 text-yellow-700',
    avoid: 'bg-red-100 text-red-700'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colors[rating]}`}>
      {rating.charAt(0).toUpperCase() + rating.slice(1)}
    </span>
  );
}

export default function FlightOffer({ flight }: FlightOfferProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-br from-blue-600 to-indigo-600 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Découvrez {flight.destination.name}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {flight.destination.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{flight.outbound.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{flight.outbound.arrival.airport}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Flight Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Flight Details */}
            <section className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Détails du Vol</h2>
              <div className="space-y-8">
                {/* Outbound Flight */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Vol Aller</h3>
                  <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl">
                    <div className="flex-1">
                      <p className="text-2xl font-bold">{flight.outbound.departure.time}</p>
                      <p className="text-gray-600">{flight.outbound.departure.airport}</p>
                      <p className="text-sm text-gray-500">Terminal {flight.outbound.departure.terminal}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="w-24 h-px bg-gray-300 relative">
                        <Plane className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-2xl font-bold">{flight.outbound.arrival.time}</p>
                      <p className="text-gray-600">{flight.outbound.arrival.airport}</p>
                      <p className="text-sm text-gray-500">Terminal {flight.outbound.arrival.terminal}</p>
                    </div>
                  </div>
                </div>

                {/* Return Flight if exists */}
                {flight.return && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Vol Retour</h3>
                    <div className="flex items-center gap-8 p-6 bg-gray-50 rounded-xl">
                      <div className="flex-1">
                        <p className="text-2xl font-bold">{flight.return.departure.time}</p>
                        <p className="text-gray-600">{flight.return.departure.airport}</p>
                        <p className="text-sm text-gray-500">Terminal {flight.return.departure.terminal}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <div className="w-24 h-px bg-gray-300 relative">
                          <Plane className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 text-blue-600 rotate-180" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-2xl font-bold">{flight.return.arrival.time}</p>
                        <p className="text-gray-600">{flight.return.arrival.airport}</p>
                        <p className="text-sm text-gray-500">Terminal {flight.return.arrival.terminal}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Baggage Information */}
            <section className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Informations Bagages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Luggage className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Bagage Cabine</h3>
                  </div>
                  <p className="text-gray-600">{flight.baggage.cabin}</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Luggage className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-semibold">Bagage en Soute</h3>
                  </div>
                  <p className="text-gray-600">{flight.baggage.checked}</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="font-semibold mb-4">Restrictions</h3>
                <ul className="space-y-2">
                  {flight.baggage.restrictions.map((restriction, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-600">
                      <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{restriction}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Onboard Services */}
            <section className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Services à Bord</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {flight.features.map((feature, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-600">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Things to Do */}
            <section className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">À Découvrir</h2>
              <div className="grid gap-6">
                {flight.destination.attractions.map((attraction, index) => (
                  <div key={index} className="p-6 bg-gray-50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{attraction.name}</h3>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {attraction.distance}
                      </span>
                    </div>
                    <p className="text-gray-600">{attraction.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Weather Information */}
            <section className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Climat</h2>
              <WeatherTable data={flight.weather} />
            </section>
          </div>

          {/* Right Column - Booking and Info */}
          <div className="space-y-8">
            {/* Booking Card */}
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-600">À partir de</p>
                  <p className="text-4xl font-bold text-blue-600">{flight.price}€</p>
                  <p className="text-sm text-gray-600">
                    {flight.return ? 'Aller-retour' : 'Aller simple'}
                  </p>
                </div>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mb-4">
                  Réserver maintenant
                </button>
                <p className="text-xs text-center text-gray-500">
                  Prix total TTC, frais de service inclus
                </p>
              </div>

              {/* Peak Seasons */}
              <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
                <h3 className="font-semibold mb-6">Périodes Touristiques</h3>
                <div className="space-y-6">
                  {flight.peakSeasons.map((season, index) => (
                    <div key={index} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{season.period}</h4>
                        <SeasonBadge rating={season.rating} />
                      </div>
                      <p className="text-sm text-gray-600">{season.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Information */}
              <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
                <h3 className="font-semibold mb-6">Informations Pratiques</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Visa</p>
                    <p className="text-sm text-gray-600">{flight.destination.practicalInfo.visa}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Devise</p>
                    <p className="text-sm text-gray-600">{flight.destination.practicalInfo.currency}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Langue</p>
                    <p className="text-sm text-gray-600">{flight.destination.practicalInfo.language}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Fuseau Horaire</p>
                    <p className="text-sm text-gray-600">{flight.destination.practicalInfo.timeZone}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Santé</p>
                    <ul className="space-y-2">
                      {flight.destination.practicalInfo.health.map((tip, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}