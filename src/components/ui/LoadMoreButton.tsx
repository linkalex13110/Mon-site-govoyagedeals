import React from 'react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading: boolean;
  disabled: boolean;
}

export default function LoadMoreButton({ onClick, loading, disabled }: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Chargement...
        </div>
      ) : (
        'Voir plus d\'offres'
      )}
    </button>
  );
}