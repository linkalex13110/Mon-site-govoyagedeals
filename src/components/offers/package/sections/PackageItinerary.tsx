import React from 'react';
import { Calendar } from 'lucide-react';

interface Activity {
  day: number;
  title: string;
  description: string;
  activities: string[];
}

interface PackageItineraryProps {
  itinerary: Activity[];
}

export default function PackageItinerary({ itinerary }: PackageItineraryProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Programme du séjour</h2>
      </div>

      <div className="space-y-8">
        {itinerary.map((day) => (
          <div key={day.day} className="relative pl-8 pb-8 last:pb-0">
            {/* Timeline */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-blue-100">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">J{day.day}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-3">{day.title}</h3>
              <p className="text-gray-600 mb-4">{day.description}</p>
              
              <div className="space-y-2">
                {day.activities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span className="text-gray-600">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}