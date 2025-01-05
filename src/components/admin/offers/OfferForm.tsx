import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Offer, AirportBookingLink } from '../../../services/offers/types';
import BasicInfoSection from './sections/BasicInfoSection';
import FlightDetailsSection from './sections/FlightDetailsSection';
import StatusSection from './sections/StatusSection';

interface OfferFormProps {
  initialData?: Partial<Offer>;
  onSubmit: (data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function OfferForm({ initialData, onSubmit, onCancel }: OfferFormProps) {
  const [selectedAirports, setSelectedAirports] = useState<string[]>(
    initialData?.availableAirports || []
  );
  const [bookingLinks, setBookingLinks] = useState<AirportBookingLink[]>(
    initialData?.airportBookingLinks || []
  );

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      image_url: initialData?.image_url || '',
      category: initialData?.category || 'SÉJOURS',
      status: initialData?.status || 'active',
      featured: initialData?.featured || false,
      baggage: initialData?.baggage || {
        handBaggage: { included: false },
        cabinBaggage: { included: false }
      }
    }
  });

  const category = watch('category');

  const handleFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      availableAirports: selectedAirports,
      airportBookingLinks: bookingLinks
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex-1 overflow-y-auto">
      <div className="p-6 space-y-6">
        <BasicInfoSection register={register} errors={errors} />
        
        {(category === 'VOLS' || category === 'SÉJOURS') && (
          <FlightDetailsSection
            register={register}
            selectedAirports={selectedAirports}
            onAirportsChange={setSelectedAirports}
            bookingLinks={bookingLinks}
            onBookingLinksChange={setBookingLinks}
          />
        )}
        
        <StatusSection register={register} />
      </div>

      <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          {initialData ? 'Mettre à jour' : 'Créer'}
        </button>
      </div>
    </form>
  );
}