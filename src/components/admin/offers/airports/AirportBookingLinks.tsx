import React from 'react';
import { FRENCH_AIRPORTS } from '../../../../data/airports';
import { AirportBookingLink } from '../../../../services/offers/types';

interface AirportBookingLinksProps {
  selectedAirports: string[];
  bookingLinks: AirportBookingLink[];
  onChange: (links: AirportBookingLink[]) => void;
}

export default function AirportBookingLinks({ 
  selectedAirports, 
  bookingLinks,
  onChange 
}: AirportBookingLinksProps) {
  const handleLinkChange = (airportCode: string, bookingUrl: string) => {
    const newLinks = [...bookingLinks];
    const existingIndex = newLinks.findIndex(link => link.airportCode === airportCode);
    
    if (existingIndex >= 0) {
      newLinks[existingIndex] = { airportCode, bookingUrl };
    } else {
      newLinks.push({ airportCode, bookingUrl });
    }
    
    onChange(newLinks);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-700">Liens de réservation par aéroport</h4>
      <div className="grid gap-4">
        {selectedAirports.map(code => {
          const airport = FRENCH_AIRPORTS.find(a => a.code === code);
          const bookingLink = bookingLinks.find(link => link.airportCode === code);
          
          if (!airport) return null;

          return (
            <div key={code} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-48">
                <span className="text-sm font-medium text-gray-700">{airport.city} ({code})</span>
              </div>
              <input
                type="url"
                value={bookingLink?.bookingUrl || ''}
                onChange={(e) => handleLinkChange(code, e.target.value)}
                placeholder="https://..."
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}