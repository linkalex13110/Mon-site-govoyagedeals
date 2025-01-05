import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useOffersSync } from '../../hooks/useOffersSync';
import { offersService, Offer } from '../../services/offers.service';
import OfferForm from '../../components/admin/offers/OfferForm';
import OfferList from '../../components/admin/offers/OfferList';
import { toast } from 'react-hot-toast';

export default function AdminOffers() {
  const { offers } = useOffersSync();
  const [showForm, setShowForm] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleCreateOffer = async (data: Omit<Offer, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      await offersService.createOffer(data);
      setShowForm(false);
      toast.success('Offre créée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la création de l\'offre');
      console.error('Error creating offer:', error);
    }
  };

  const handleUpdateOffer = async (data: Partial<Offer>) => {
    if (!selectedOffer) return;
    
    try {
      await offersService.updateOffer(selectedOffer.id, data);
      setSelectedOffer(null);
      setShowForm(false);
      toast.success('Offre mise à jour avec succès');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour de l\'offre');
      console.error('Error updating offer:', error);
    }
  };

  const handleDeleteOffer = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return;
    
    try {
      await offersService.deleteOffer(id);
      toast.success('Offre supprimée avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression de l\'offre');
      console.error('Error deleting offer:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gestion des Offres</h1>
          <p className="text-gray-600">Gérez vos offres de voyage</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Nouvelle Offre
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {selectedOffer ? 'Modifier l\'offre' : 'Nouvelle offre'}
              </h2>
            </div>
            
            <OfferForm
              initialData={selectedOffer || undefined}
              onSubmit={selectedOffer ? handleUpdateOffer : handleCreateOffer}
              onCancel={() => {
                setShowForm(false);
                setSelectedOffer(null);
              }}
            />
          </div>
        </div>
      )}

      <OfferList
        offers={offers}
        onEdit={(offer) => {
          setSelectedOffer(offer);
          setShowForm(true);
        }}
        onDelete={handleDeleteOffer}
      />
    </div>
  );
}