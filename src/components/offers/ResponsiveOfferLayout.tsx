import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Offer } from '../../services/offers.service';

interface ResponsiveOfferLayoutProps {
  offer: Offer;
  children: React.ReactNode;
  heroContent?: React.ReactNode;
}

export default function ResponsiveOfferLayout({ 
  offer, 
  children,
  heroContent 
}: ResponsiveOfferLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mobile avec bouton retour */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Retour"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
        <img
          src={offer.image_url}
          alt={offer.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        
        {/* Contenu Hero */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              {heroContent}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {children}
        </div>
      </div>
    </div>
  );
}