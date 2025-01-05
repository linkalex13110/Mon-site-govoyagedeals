import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface StatusSectionProps {
  register: UseFormRegister<any>;
}

export default function StatusSection({ register }: StatusSectionProps) {
  return (
    <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
      <h3 className="font-medium text-gray-900">Statut et visibilité</h3>
      
      <div className="flex items-center gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Statut
          </label>
          <select
            {...register('status')}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
            <option value="draft">Brouillon</option>
          </select>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('featured')}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Mettre en avant cette offre</span>
        </label>
      </div>
    </div>
  );
}