import React from 'react';
import { Shield, Globe, Users, CreditCard, Star, Clock, Plane } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Réservation Sécurisée',
    description: 'Protection garantie de vos paiements avec un cryptage de niveau bancaire.'
  },
  {
    icon: Star,
    title: 'Meilleurs Prix',
    description: 'Garantie du meilleur tarif avec notre système de comparaison en temps réel.'
  },
  {
    icon: Plane,
    title: 'Vols Exclusifs',
    description: 'Accès à des offres spéciales et des tarifs négociés avec nos partenaires.'
  },
  {
    icon: CreditCard,
    title: 'Paiement Flexible',
    description: 'Multiples options de paiement et possibilité de payer en plusieurs fois.'
  }
];

export default function Features() {
  return (
    <div className="container mx-auto px-6">
      {/* Features Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
          Pourquoi Nous Choisir
        </h2>
        <p className="text-gray-400 text-lg">
          Nous nous engageons à vous offrir la meilleure expérience de voyage possible
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500 -z-10" />
              <div className="relative p-8 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 p-3 mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}