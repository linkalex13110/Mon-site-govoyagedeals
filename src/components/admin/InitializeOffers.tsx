import React, { useState } from 'react';
import { addInitialOffers } from '../../scripts/addInitialOffers';

export default function InitializeOffers() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInitialize = async () => {
    try {
      setIsLoading(true);
      setMessage('Initialisation des offres...');
      await addInitialOffers();
      setMessage('Les offres ont été ajoutées avec succès !');
    } catch (error) {
      setMessage('Erreur lors de l\'initialisation des offres.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Initialisation des Offres</h2>
      <button
        onClick={handleInitialize}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Initialisation...' : 'Initialiser les Offres'}
      </button>
      {message && (
        <p className="mt-4 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}