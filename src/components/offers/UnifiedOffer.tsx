import React, { useState } from 'react';
import { MapPin, Calendar, Clock, Tag } from 'lucide-react';
import { Offer } from '../../services/offers/types';
import { formatPrice } from '../../utils/format';
import { getCategoryWithEmoji } from '../../utils/categoryEmojis';
import OfferDescription from './sections/OfferDescription';
import OfferBaggage from './sections/OfferBaggage';
import OfferServices from './sections/OfferServices';
import OfferBooking from './sections/OfferBooking';
import MobileBookingBanner from './MobileBookingBanner';
import BookingModal from './BookingModal';
import type { Airport } from '../../data/airports';

interface UnifiedOfferProps {
  offer: Offer;
}

export default function UnifiedOffer({ offer }: UnifiedOfferProps) {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const isHotelOffer = offer.category === 'HÔTELS';

  const handleBook = () => {
    if (!isHotelOffer && !selectedAirport) return;
    setShowBookingModal(true);
  };

  const getBookingUrl = () => {
    if (isHotelOffer) return '';
    if (!selectedAirport) return '';
    const link = offer.airportBookingLinks?.find(
      link => link.airportCode === selectedAirport.code
    );
    return link?.bookingUrl || '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  {getCategoryWithEmoji(offer.category)}
                </span>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(offer.created_at).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">{offer.title}</h1>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-5 h-5" />
                <span>Destination</span>
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
            <OfferDescription 
              description={offer.description} 
              availableAirports={!isHotelOffer ? offer.availableAirports : []}
            />
            {offer.baggage && <OfferBaggage baggage={offer.baggage} />}
            <OfferServices />
          </div>

          {/* Right Column */}
          <div>
            <OfferBooking 
              price={offer.price} 
              availableAirports={offer.availableAirports}
              airportBookingLinks={offer.airportBookingLinks || []}
              offer={offer}
              selectedAirport={selectedAirport}
              onAirportSelect={setSelectedAirport}
              onBook={handleBook}
            />
          </div>
        </div>
      </div>

      {/* Mobile Booking Banner */}
      {!isHotelOffer && (
        <MobileBookingBanner 
          price={offer.price}
          availableAirports={offer.availableAirports}
          onAirportSelect={setSelectedAirport}
          onBook={handleBook}
          selectedAirport={selectedAirport}
        />
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        offer={offer}
        bookingUrl={getBookingUrl()}
      />
    </div>
  );
}