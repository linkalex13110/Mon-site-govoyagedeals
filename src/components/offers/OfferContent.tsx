```tsx
import React from 'react';
import { Info } from 'lucide-react';

interface OfferContentProps {
  description: string;
  children?: React.ReactNode;
}

export default function OfferContent({ description, children }: OfferContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Description */}
      <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-bold mb-6">Description</h2>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Contenu additionnel */}
      {children}

      {/* Note importante */}
      <div className="bg-blue-50 rounded-xl p-4 lg:p-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Information importante</h3>
            <p className="text-sm text-blue-700">
              Les prix peuvent varier selon la période. Contactez-nous pour plus de détails.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```