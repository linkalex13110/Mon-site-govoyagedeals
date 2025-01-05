import React, { useEffect } from 'react';
import { Plane } from 'lucide-react';
import { useAirports } from '../../../hooks/useAirports';
import { airportsService } from '../../../services/airports.service';
import { toast } from 'react-hot-toast';

const AIRPORTS_DATA = [
  { code: 'CDG', name: 'Paris Charles de Gaulle', city: 'Paris' },
  { code: 'ORY', name: 'Paris Orly', city: 'Paris' },
  { code: 'NCE', name: 'Nice Côte d\'Azur', city: 'Nice' },
  { code: 'LYS', name: 'Lyon Saint-Exupéry', city: 'Lyon' },
  { code: 'MRS', name: 'Marseille Provence', city: 'Marseille' },
  { code: 'TLS', name: 'Toulouse-Blagnac', city: 'Toulouse' },
  { code: 'BOD', name: 'Bordeaux-Mérignac', city: 'Bordeaux' }
];

export default function AirportManagement() {
  const { airports, loading } = useAirports();

  useEffect(() => {
    const initializeAirports = async () => {
      for (const airport of AIRPORTS_DATA) {
        try {
          await airportsService.updateAirportStatus(airport.code, {
            name: airport.name,
            city: airport.city,
            available: false
          });
        } catch (error) {
          console.error(`Error initializing airport ${airport.code}:`, error);
        }
      }
    };

    if (!loading && airports.length === 0) {
      initializeAirports();
    }
  }, [airports, loading]);

  const handleToggleAirport = async (code: string) => {
    try {
      const airport = airports.find(a => a.code === code);
      if (!airport) return;

      await airportsService.updateAirportStatus(code, {
        ...airport,
        available: !airport.available
      });
      toast.success('Aéroport mis à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de l\'aéroport');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Plane className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Aéroports disponibles</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {AIRPORTS_DATA.map((airport) => {
          const dbAirport = airports.find(a => a.code === airport.code);
          const isAvailable = dbAirport?.available ?? false;
          
          return (
            <button
              key={airport.code}
              onClick={() => handleToggleAirport(airport.code)}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                isAvailable 
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div>
                <h3 className="font-medium">{airport.city}</h3>
                <p className="text-sm text-gray-600">{airport.name}</p>
                <span className="text-xs text-blue-600 mt-1">{airport.code}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}