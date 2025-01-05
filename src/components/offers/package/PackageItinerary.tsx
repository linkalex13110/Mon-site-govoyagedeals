import React from 'react';
import { Calendar } from 'lucide-react';

interface Day {
  title: string;
  description: string;
}

interface PackageItineraryProps {
  days: Day[];
}

export default function PackageItinerary({ days }: PackageItineraryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Programme du séjour</h2>
      <div className="space-y-6">
        {days.map((day, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-semibold text-lg mb-2">{day.title}</h3>
              <p className="text-gray-600">{day.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}