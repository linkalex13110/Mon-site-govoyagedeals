import React from 'react';
import { Clock } from 'lucide-react';
import { usePublicationDate } from '../../hooks/usePublicationDate';
import { getPublicationStatus } from '../../utils/date';

interface PublicationDateProps {
  date: string | Date;
  maxAgeDays?: number;
  showIcon?: boolean;
}

export function PublicationDate({ date, maxAgeDays, showIcon = true }: PublicationDateProps) {
  const { formattedDate, isExpired } = usePublicationDate(date, maxAgeDays);
  const status = getPublicationStatus(date);

  const statusStyles = {
    recent: 'text-green-600',
    normal: 'text-gray-600',
    old: 'text-red-600'
  };

  return (
    <div className={`flex items-center gap-2 ${statusStyles[status]}`}>
      {showIcon && <Clock className="w-4 h-4" />}
      <span className="text-sm">
        {isExpired ? 'Offre expirée' : formattedDate}
      </span>
    </div>
  );
}