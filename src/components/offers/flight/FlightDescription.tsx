import React from 'react';
import { Info } from 'lucide-react';

interface FlightDescriptionProps {
  description: string;
}

export default function FlightDescription({ description }: FlightDescriptionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Description</h2>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}