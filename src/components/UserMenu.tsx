import React from 'react';
import { LogIn, UserPlus, Settings, HelpCircle } from 'lucide-react';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserMenu({ isOpen, onClose }: UserMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-20 right-6 z-50">
      <div className="w-72 bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-black/5">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bienvenue</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl btn-primary">
              <LogIn className="w-5 h-5" />
              Se connecter
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-xl btn-secondary">
              <UserPlus className="w-5 h-5" />
              Créer un compte
            </button>
          </div>
        </div>
        <div className="border-t border-gray-200 py-2">
          <button className="w-full flex items-center gap-3 px-6 py-2 text-sm text-gray-700 btn-menu">
            <Settings className="w-5 h-5" />
            Paramètres
          </button>
          <button className="w-full flex items-center gap-3 px-6 py-2 text-sm text-gray-700 btn-menu">
            <HelpCircle className="w-5 h-5" />
            Aide
          </button>
        </div>
      </div>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
    </div>
  );
}