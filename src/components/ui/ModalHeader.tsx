import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  icon: LucideIcon;
}

export default function ModalHeader({ title, onClose, icon: Icon }: ModalHeaderProps) {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-100">
      <button
        onClick={onClose}
        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Icon className="w-5 h-5" />
      </button>
      <h2 className="font-medium">{title}</h2>
    </div>
  );
}