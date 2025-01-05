import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Airport } from '../../data/airports';
import AirportList from './AirportList';
import ModalHeader from '../ui/ModalHeader';

interface AirportSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableAirports: string[];
  onSelect: (airport: Airport) => void;
}

export default function AirportSelectionModal({
  isOpen,
  onClose,
  availableAirports,
  onSelect
}: AirportSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      <div className="absolute inset-x-4 top-20 sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-white rounded-xl shadow-xl sm:max-w-md w-full">
        <ModalHeader 
          title="Choisir l'aéroport de départ"
          onClose={onClose}
          icon={ArrowLeft}
        />

        <div className="p-4 max-h-[400px] overflow-y-auto">
          <AirportList 
            availableAirports={availableAirports}
            onSelect={(airport) => {
              onSelect(airport);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}