import React from 'react';
import { formatPrice } from '../../utils/format';

interface PriceProps {
  value: number;
  className?: string;
  showFrom?: boolean;
}

export function Price({ value, className = '', showFrom = false }: PriceProps) {
  return (
    <div className={className}>
      {showFrom && <p className="text-sm text-gray-500">À partir de</p>}
      <p className="text-2xl font-bold text-blue-600">{formatPrice(value)}€</p>
    </div>
  );
}