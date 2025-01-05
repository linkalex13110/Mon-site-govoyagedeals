import React from 'react';
import { Info } from 'lucide-react';

interface HotelDescriptionProps {
  description: string;
}

export default function HotelDescription({ description }: HotelDescriptionProps) {
  const roomTypes = [
    {
      type: 'Chambre Deluxe',
      description: 'Chambre spacieuse avec vue sur la ville',
      price: 250,
      capacity: 2
    },
    {
      type: 'Suite Junior',
      description: 'Suite élégante avec salon séparé',
      price: 350,
      capacity: 3
    },
    {
      type: 'Suite Exécutive',
      description: 'Suite luxueuse avec vue panoramique',
      price: 450,
      capacity: 4
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Description</h2>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-gray-600">{description}</p>
      </div>

      <h3 className="text-xl font-bold mb-4">Types de chambres</h3>
      <div className="grid gap-4">
        {roomTypes.map((room, index) => (
          <div key={index} className="p-6 bg-gray-50 rounded-xl">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-lg">{room.type}</h4>
              <span className="text-blue-600 font-bold">{room.price}€</span>
            </div>
            <p className="text-gray-600 mb-3">{room.description}</p>
            <div className="flex items-center gap-2 text-gray-500">
              <span>Jusqu'à {room.capacity} personnes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}