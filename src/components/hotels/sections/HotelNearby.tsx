import React from 'react';
import { Utensils, Landmark, Activity } from 'lucide-react';

interface NearbyItem {
  name: string;
  distance: string;
  description: string;
  priceRange?: string;
}

interface HotelNearbyProps {
  restaurants: NearbyItem[];
  attractions: NearbyItem[];
  activities: NearbyItem[];
}

export default function HotelNearby({ restaurants, attractions, activities }: HotelNearbyProps) {
  return (
    <div className="space-y-8">
      {/* Restaurants */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Utensils className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Restaurants</h2>
        </div>
        <div className="grid gap-6">
          {restaurants.map((restaurant, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{restaurant.name}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {restaurant.distance}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{restaurant.description}</p>
              {restaurant.priceRange && (
                <p className="text-sm text-blue-600">Prix moyen : {restaurant.priceRange}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Attractions */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Landmark className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Sites touristiques</h2>
        </div>
        <div className="grid gap-6">
          {attractions.map((attraction, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{attraction.name}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {attraction.distance}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{attraction.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activités */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Activités et loisirs</h2>
        </div>
        <div className="grid gap-6">
          {activities.map((activity, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{activity.name}</h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {activity.distance}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}