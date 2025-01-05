import React from 'react';
import { Coffee, Wifi, Monitor, Power } from 'lucide-react';

const services = [
  { icon: Coffee, name: 'Repas inclus', description: 'Menu complet avec choix de plats' },
  { icon: Wifi, name: 'Wi-Fi à bord', description: 'Connexion internet disponible' },
  { icon: Monitor, name: 'Divertissement', description: 'Films, séries et musique' },
  { icon: Power, name: 'Prises électriques', description: 'Prises USB et 220V' }
];

export default function OfferServices() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Services inclus</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div key={index} className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <h3 className="font-medium mb-1">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}