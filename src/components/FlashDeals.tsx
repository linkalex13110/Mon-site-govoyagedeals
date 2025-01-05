import React from 'react';
import { Timer, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// ... (rest of the imports remain the same)

export default function FlashDeals() {
  // ... (previous state and functions remain the same)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
      {flashDeals.map((deal) => (
        <div
          key={deal.id}
          className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          {/* ... (image and content sections remain the same) */}

          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500 line-through">{deal.originalPrice}€</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{deal.price}€</p>
              </div>
              <Link
                to={`/offres/hotel/${deal.id}`}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors text-sm"
              >
                <span>Réserver</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* ... (progress bar section remains the same) */}
          </div>
        </div>
      ))}
    </div>
  );
}