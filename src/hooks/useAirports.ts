import { useState, useEffect } from 'react';
import { Airport, airportsService } from '../services/airports.service';

export function useAirports() {
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = airportsService.subscribeToAirports((updatedAirports) => {
      setAirports(updatedAirports);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { airports, loading, error };
}