import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Briefcase, MapPin, Clock } from 'lucide-react';

interface JobOfferCardProps {
  offer: {
    id: string;
    title: string;
    location: string;
    department: string;
    created_at: string;
  };
}

export default function JobOfferCard({ offer }: JobOfferCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6">
      <div className="flex items-center gap-3 text-blue-600 mb-4">
        <Briefcase className="w-5 h-5" />
        <span className="font-medium">{offer.department}</span>
      </div>

      <h3 className="text-xl font-bold mb-4">{offer.title}</h3>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{offer.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4" />
          <span>
            {formatDistanceToNow(new Date(offer.created_at), {
              addSuffix: true,
              locale: fr
            })}
          </span>
        </div>
      </div>

      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Voir l'offre
      </button>
    </div>
  );
}