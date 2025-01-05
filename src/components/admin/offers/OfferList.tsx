import React from 'react';
import { useOffersSync } from '../../../hooks/useOffersSync';
import { Offer } from '../../../services/offers.service';
import { Star, Pencil, Trash2, Eye } from 'lucide-react';
import { formatPrice } from '../../../utils/format';
import { getCategoryWithEmoji } from '../../../utils/categoryEmojis';

interface OfferListProps {
  onEdit: (offer: Offer) => void;
  onDelete: (id: string) => void;
}

export default function OfferList({ onEdit, onDelete }: OfferListProps) {
  const { offers } = useOffersSync();

  if (!offers.length) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-lg">
        <p className="text-gray-600">Aucune offre disponible</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Offre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Catégorie</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Prix</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Statut</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {offers.map((offer) => (
              <tr key={offer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={offer.image_url}
                      alt={offer.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{offer.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{offer.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium whitespace-nowrap">
                    {getCategoryWithEmoji(offer.category)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{formatPrice(offer.price)}€</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    offer.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {offer.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(offer)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(offer.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}