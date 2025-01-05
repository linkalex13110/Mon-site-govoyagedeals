import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';

const PAGE_SIZE = 8;

export function useJobOffers() {
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadOffers = async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (error) throw error;

      if (data) {
        setOffers(prev => [...prev, ...data]);
        setHasMore(data.length === PAGE_SIZE);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading offers:', error);
      toast.error('Erreur lors du chargement des offres');
    } finally {
      setLoading(false);
    }
  };

  // Charger la première page au montage
  useEffect(() => {
    loadOffers();
  }, []);

  return {
    offers,
    loading,
    hasMore,
    loadMore: loadOffers
  };
}