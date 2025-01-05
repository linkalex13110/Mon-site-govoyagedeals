import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface HotelHeaderProps {
  hotel: {
    title: string;
    image_url: string;
    location: {
      address: string;
    };
  };
}

export default function HotelHeader({ hotel }: HotelHeaderProps) {
  return (
    <div className="relative h-[60vh] overflow-hidden">
      <img
        src={hotel.image_url}
        alt={hotel.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-white mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400' : 'fill-gray-400'}`}
                />
              ))}
              <span className="ml-2 text-white/90">4.8 / 5</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{hotel.title}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-5 h-5" />
              <span>{hotel.location.address}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}