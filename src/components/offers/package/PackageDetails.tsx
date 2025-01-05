import React from 'react';
import { Check } from 'lucide-react';

interface PackageDetailsProps {
  description: string;
  highlights: string[];
}

export default function PackageDetails({ description, highlights }: PackageDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Description du séjour</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Points forts du séjour</h2>
        <div className="grid gap-4">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="p-1 bg-blue-100 rounded-full">
                <Check className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-gray-600">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}