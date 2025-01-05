import React from 'react';
import { Info, Map, Package } from 'lucide-react';

interface PackageTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function PackageTabs({ activeTab, onTabChange }: PackageTabsProps) {
  const tabs = [
    { id: 'description', label: 'Description', icon: Info },
    { id: 'itinerary', label: 'Itinéraire', icon: Map },
    { id: 'inclusions', label: 'Inclusions', icon: Package }
  ];

  return (
    <div className="flex gap-2 bg-white/50 backdrop-blur-sm p-1 rounded-xl shadow-sm">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            activeTab === id
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'hover:bg-white/80 text-gray-600'
          }`}
        >
          <Icon className="w-5 h-5" />
          {label}
        </button>
      ))}
    </div>
  );
}