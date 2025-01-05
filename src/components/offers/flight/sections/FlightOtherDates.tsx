import React from 'react';
import { Calendar } from 'lucide-react';
import { formatPrice } from '../../../../utils/format';

interface DateOption {
  startDate: string;
  endDate: string;
  price: number;
  url: string;
}

interface FlightOtherDatesProps {
  dates: DateOption[];
}

export default function FlightOtherDates({ dates }: FlightOtherDatesProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Autres dates</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dates.map((option, index) => (
          <a
            key={index}
            href={option.url}
            className="group block p-4 bg-gray-50 hover:bg-blue-50 rounded-xl border-2 border-gray-100 hover:border-blue-200 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">
                {option.startDate} - {option.endDate}
              </span>
              <span className="text-blue-600 font-bold">
                {formatPrice(option.price)}€
              </span>
            </div>
            <div className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
              Voir l'offre →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}