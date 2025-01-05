import React from 'react';
import AirportManagement from '../../components/admin/airports/AirportManagement';

export default function AdminAirports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Gestion des Aéroports</h1>
        <p className="text-gray-600">Sélectionnez les aéroports de départ disponibles pour les vols</p>
      </div>

      <AirportManagement />
    </div>
  );
}