import React, { useState } from 'react';
import { MapPin, Calendar, Heart, Tag } from 'lucide-react';

interface Deal {
  id: number;
  type: string;
  title: string;
  description: string;
  price: number;
  image: string;
  date: string;
  location: string;
}

const deals: Deal[] = [
  {
    id: 1,
    type: 'SÉJOURS',
    title: 'Week-end de rêve à Amsterdam',
    description: 'Profitez du festival des lumières et des marchés de Noël avec ce séjour de 3 jours dans un hôtel 4 étoiles au cœur d\'Amsterdam.',
    price: 283,
    image: 'https://images.unsplash.com/photo-1584003564911-a5a0d19d403b?auto=format&fit=crop&q=80&w=800&h=600',
    date: '09/11/2024',
    location: 'Amsterdam'
  },
  {
    id: 2,
    type: 'VOLS',
    title: 'Vol A/R Paris - Bangkok',
    description: 'Vol direct avec une compagnie premium, bagages inclus. Période idéale pour découvrir la Thaïlande.',
    price: 576,
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&q=80&w=800&h=600',
    date: '09/11/2024',
    location: 'Bangkok'
  },
  {
    id: 3,
    type: 'HÔTELS',
    title: 'Séjour luxe à Londres',
    description: 'Hôtel 5 étoiles au cœur de Londres, petit-déjeuner inclus. À deux pas de Big Ben et du London Eye.',
    price: 199,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800&h=600',
    date: '09/11/2024',
    location: 'Londres'
  },
  {
    id: 4,
    type: 'SÉJOURS',
    title: 'Escapade à Cancún',
    description: '8 jours au Mexique dans un resort all-inclusive avec accès direct à la plage et activités nautiques.',
    price: 819,
    image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?auto=format&fit=crop&q=80&w=800&h=600',
    date: '08/11/2024',
    location: 'Cancún'
  },
  {
    id: 5,
    type: 'VOLS',
    title: 'Vol Paris - New York',
    description: 'Vol direct en classe économique premium, parfait pour un city-break à Big Apple.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&q=80&w=800&h=600',
    date: '15/11/2024',
    location: 'New York'
  },
  {
    id: 6,
    type: 'SÉJOURS',
    title: 'Découverte des Maldives',
    description: 'Séjour paradisiaque dans un bungalow sur pilotis avec vue sur le lagon.',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800&h=600',
    date: '20/11/2024',
    location: 'Maldives'
  },
  {
    id: 7,
    type: 'HÔTELS',
    title: 'Ryokan traditionnel à Kyoto',
    description: 'Expérience authentique dans un ryokan de luxe avec onsen privé et cuisine kaiseki.',
    price: 245,
    image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=800&h=600',
    date: '12/11/2024',
    location: 'Kyoto'
  },
  {
    id: 8,
    type: 'SÉJOURS',
    title: 'Safari en Tanzanie',
    description: 'Safari de luxe dans le Serengeti avec hébergement en lodge et vue sur la savane.',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800&h=600',
    date: '25/11/2024',
    location: 'Serengeti'
  }
];

export default function LatestDeals() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const loadMore = () => {
    setStartIndex(prev => (prev + 8) % deals.length);
  };

  // Get 8 deals starting from startIndex, wrapping around if necessary
  const visibleDeals = [...deals.slice(startIndex), ...deals.slice(0, startIndex)]
    .slice(0, 8);

  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Dernières Offres</h2>
          <p className="text-gray-600">Les meilleures offres sélectionnées par nos experts</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleDeals.map((deal) => (
          <div
            key={`${deal.id}-${startIndex}`}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="relative">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <button 
                onClick={() => toggleFavorite(deal.id)}
                className={`absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors group/heart ${
                  favorites.includes(deal.id) ? 'animate-like' : ''
                }`}
              >
                <Heart 
                  className={`w-5 h-5 transition-transform group-hover/heart:scale-110 ${
                    favorites.includes(deal.id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-600'
                  }`}
                />
              </button>
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                  <Tag className="w-4 h-4" />
                  {deal.type}
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>{deal.location}</span>
                <span className="mx-2">•</span>
                <Calendar className="w-4 h-4" />
                <span>{deal.date}</span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                {deal.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {deal.description}
              </p>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-gray-500">À partir de</p>
                  <p className="text-2xl font-bold text-blue-600">{deal.price}€</p>
                </div>
                <a
                  href={`https://www.kiwi.com/fr/recherche/results/france/${deal.location.toLowerCase()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm font-medium"
                >
                  Voir l'offre
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={loadMore}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
        >
          Voir plus d'offres
        </button>
      </div>
    </div>
  );
}