import React, { useState } from 'react';
import { MapPin, Star } from 'lucide-react';

const allDestinations = [
  {
    id: 1,
    name: "Santorin",
    country: "Grèce",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800&h=400",
    price: 299
  },
  {
    id: 2,
    name: "Maldives",
    country: "Maldives",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800&h=400",
    price: 899
  },
  {
    id: 3,
    name: "Tokyo",
    country: "Japon",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800&h=400",
    price: 599
  },
  {
    id: 4,
    name: "New York",
    country: "États-Unis",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800&h=400",
    price: 399
  },
  {
    id: 5,
    name: "Bali",
    country: "Indonésie",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800&h=400",
    price: 799
  },
  {
    id: 6,
    name: "Paris",
    country: "France",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800&h=400",
    price: 199
  },
  {
    id: 7,
    name: "Dubai",
    country: "Émirats Arabes Unis",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800&h=400",
    price: 599
  },
  {
    id: 8,
    name: "Bangkok",
    country: "Thaïlande",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800&h=400",
    price: 499
  },
  {
    id: 9,
    name: "Rome",
    country: "Italie",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800&h=400",
    price: 299
  },
  {
    id: 10,
    name: "Rio de Janeiro",
    country: "Brésil",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&q=80&w=800&h=400",
    price: 699
  },
  {
    id: 11,
    name: "Sydney",
    country: "Australie",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80&w=800&h=400",
    price: 899
  },
  {
    id: 12,
    name: "Amsterdam",
    country: "Pays-Bas",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&q=80&w=800&h=400",
    price: 249
  },
  {
    id: 13,
    name: "Barcelone",
    country: "Espagne",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800&h=400",
    price: 199
  },
  {
    id: 14,
    name: "Marrakech",
    country: "Maroc",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1597211684565-dca64d72c5cc?auto=format&fit=crop&q=80&w=800&h=400",
    price: 299
  },
  {
    id: 15,
    name: "Venise",
    country: "Italie",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800&h=400",
    price: 349
  },
  {
    id: 16,
    name: "Kyoto",
    country: "Japon",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800&h=400",
    price: 649
  }
];

export default function PopularDestinations() {
  const [visibleCount, setVisibleCount] = useState(16);
  const hasMore = visibleCount < allDestinations.length;

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 16, allDestinations.length));
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl font-bold mb-4">Destinations Populaires</h2>
          <p className="text-gray-600">Les destinations préférées de nos voyageurs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {allDestinations.slice(0, visibleCount).map((destination) => (
          <div
            key={destination.id}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            {/* Rating Badge */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium text-gray-900">{destination.rating}</span>
            </div>
            
            {/* Location Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                {destination.country}
              </div>
            </div>
            
            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-4">{destination.name}</h3>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/80 text-sm">à partir de</p>
                  <p className="text-2xl font-bold text-white">{destination.price}€</p>
                </div>
                <button className="px-4 py-2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-xl font-medium hover:bg-white transition-colors">
                  Découvrir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
          >
            Voir plus de destinations
          </button>
        </div>
      )}
    </div>
  );
}