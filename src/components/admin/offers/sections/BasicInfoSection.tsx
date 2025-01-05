import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface BasicInfoSectionProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
}

export default function BasicInfoSection({ register, errors }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Titre de l'offre
        </label>
        <input
          type="text"
          {...register('title', { required: 'Le titre est requis' })}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: Week-end à Rome tout inclus"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register('description', { required: 'La description est requise' })}
          rows={4}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Décrivez l'offre en détail..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message as string}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prix
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.01"
              {...register('price', { required: 'Le prix est requis', min: 0 })}
              className="w-full pl-4 pr-8 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
          </div>
          {errors.price && (
            <p className="mt-1 text-sm text-red-600">{errors.price.message as string}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Catégorie
          </label>
          <select
            {...register('category')}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="SÉJOURS">Séjours ✈️🌴</option>
            <option value="VOLS">Vols ✈️</option>
            <option value="HÔTELS">Hôtels 🏨</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URL
        </label>
        <input
          type="url"
          {...register('image_url', { required: 'L\'URL de l\'image est requise' })}
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        {errors.image_url && (
          <p className="mt-1 text-sm text-red-600">{errors.image_url.message as string}</p>
        )}
      </div>
    </div>
  );
}