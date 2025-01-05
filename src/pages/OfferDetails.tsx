import React from 'react';
import { useParams } from 'react-router-dom';
import { useOffer } from '../hooks/useOffer';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FlightOffer from '../components/offers/flight/FlightOffer';
import HotelOffer from '../components/offers/hotel/HotelOffer';
import PackageOffer from '../components/offers/package/PackageOffer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

export default function OfferDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: offer, isLoading, error } = useOffer(id);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !offer) {
    return <ErrorMessage message="Offre introuvable" />;
  }

  // Rediriger vers le bon composant selon la catégorie
  if (offer.category === 'HÔTELS') {
    return <HotelOffer offer={offer} />;
  }

  if (offer.category === 'VOLS') {
    return <FlightOffer offer={offer} />;
  }

  if (offer.category === 'SÉJOURS') {
    return <PackageOffer offer={offer} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-6 py-12">
        <h1>Détails de l'offre non disponibles</h1>
      </div>
      <Footer />
    </div>
  );
}