import React from 'react';
import { Check, X } from 'lucide-react';

interface PackageInclusionsProps {
  included: string[];
  notIncluded: string[];
}

export default function PackageInclusions({ included, notIncluded }: PackageInclusionsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Ce qui est inclus</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inclus */}
        <div>
          <h3 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Inclus dans le prix
          </h3>
          <ul className="space-y-3">
            {included.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Non inclus */}
        <div>
          <h3 className="font-semibold text-red-600 mb-4 flex items-center gap-2">
            <X className="w-5 h-5" />
            Non inclus
          </h3>
          <ul className="space-y-3">
            {notIncluded.map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-600">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}