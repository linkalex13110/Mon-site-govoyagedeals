import React from 'react';
import { X } from 'lucide-react';

interface Inclusion {
  icon: React.ElementType;
  text: string;
}

interface PackageInclusionsProps {
  included: Inclusion[];
  notIncluded: string[];
}

export default function PackageInclusions({ included, notIncluded }: PackageInclusionsProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Ce qui est inclus</h2>
        <div className="grid gap-6">
          {included.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-gray-600">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Non inclus</h2>
        <div className="space-y-4">
          {notIncluded.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <X className="w-5 h-5 text-red-500" />
              <span className="text-gray-600">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}