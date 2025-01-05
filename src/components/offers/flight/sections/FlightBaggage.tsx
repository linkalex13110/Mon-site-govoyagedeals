import React from 'react';
import { Luggage, Check, X } from 'lucide-react';

interface BaggageInfo {
  handBaggage?: {
    included: boolean;
  };
  cabinBaggage?: {
    included: boolean;
  };
}

interface FlightBaggageProps {
  baggage: BaggageInfo;
}

export default function FlightBaggage({ baggage }: FlightBaggageProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Luggage className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold">Bagages compris</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2">
            <Luggage className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">Bagage à main</h3>
              {baggage?.handBaggage?.included ? (
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Inclus
                </span>
              ) : (
                <span className="text-red-600 font-medium flex items-center gap-1">
                  <X className="w-4 h-4" />
                  Non inclus
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Un bagage à main de dimensions standard
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-2">
            <Luggage className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium">Bagage en soute</h3>
              {baggage?.cabinBaggage?.included ? (
                <span className="text-green-600 font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Inclus
                </span>
              ) : (
                <span className="text-red-600 font-medium flex items-center gap-1">
                  <X className="w-4 h-4" />
                  Non inclus
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">
              Un bagage en soute jusqu'à 23kg
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}