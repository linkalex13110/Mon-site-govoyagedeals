import React from 'react';
import { Info, Coffee, MapPin, Map } from 'lucide-react';

interface HotelTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function HotelTabs({ activeTab, onTabChange }: HotelTabsProps) {
  const tabs = [
    { id: 'description', label: 'Description', icon: Info },
    { id: 'amenities', label: 'Services', icon: Coffee },
    { id: 'location', label: 'Emplacement', icon: MapPin },
    { id: 'nearby', label: 'À proximité', icon: Map }
  ];

  return (
    <div className="flex overflow-x-auto scrollbar-hide">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-3 min-w-[120px] font-medium transition-colors border-b-2 ${
            activeTab === id
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-600 border-transparent hover:text-blue-600 hover:border-blue-600'
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="whitespace-nowrap">{label}</span>
        </button>
      ))}
    </div>
  );
}