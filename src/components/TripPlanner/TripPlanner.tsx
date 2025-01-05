import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Plus, Trash2, Save, Share2 } from 'lucide-react';
import Navigation from '../Navigation';
import DayPlanner from './DayPlanner';
import TripBudget from './TripBudget';
import TripChecklist from './TripChecklist';
import TripMap from './TripMap';

interface TripDay {
  id: string;
  date: Date;
  activities: Activity[];
}

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  notes: string;
  category: 'transport' | 'hotel' | 'restaurant' | 'activity' | 'other';
}

export default function TripPlanner() {
  const [tripDays, setTripDays] = useState<TripDay[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [destination, setDestination] = useState('');
  const [activeTab, setActiveTab] = useState<'planning' | 'budget' | 'checklist' | 'map'>('planning');

  // Example locations for the map
  const locations = [
    {
      id: '1',
      name: 'Tour Eiffel',
      coordinates: [48.8584, 2.2945],
      type: 'activity' as const
    },
    {
      id: '2',
      name: 'Hôtel de Ville',
      coordinates: [48.8567, 2.3508],
      type: 'hotel' as const
    }
  ];

  const addDay = () => {
    const newDay: TripDay = {
      id: crypto.randomUUID(),
      date: new Date(),
      activities: []
    };
    setTripDays([...tripDays, newDay]);
  };

  const removeDay = (dayId: string) => {
    setTripDays(tripDays.filter(day => day.id !== dayId));
  };

  const updateDay = (dayId: string, updatedDay: TripDay) => {
    setTripDays(tripDays.map(day => day.id === dayId ? updatedDay : day));
  };

  const savePlan = () => {
    // Implement save functionality
    console.log('Saving trip plan...');
  };

  const sharePlan = () => {
    // Implement share functionality
    console.log('Sharing trip plan...');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600">
      <Navigation />
      <div className="min-h-screen bg-gray-50/95 pt-8">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Header with Glass Effect */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Planificateur de Voyage</h1>
                <p className="text-gray-600">Organisez votre prochain voyage étape par étape</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={savePlan}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30"
                >
                  <Save className="w-4 h-4" />
                  Sauvegarder
                </button>
                <button
                  onClick={sharePlan}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-lg shadow-gray-200/50 hover:shadow-gray-300/50"
                >
                  <Share2 className="w-4 h-4" />
                  Partager
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300 hover:border-blue-200"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                <input
                  type="date"
                  value={startDate.toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300 hover:border-blue-200 text-gray-700 [color-scheme:light]"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600" />
                <input
                  type="date"
                  value={endDate.toISOString().split('T')[0]}
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-300 hover:border-blue-200 text-gray-700 [color-scheme:light]"
                />
              </div>
              <button
                onClick={addDay}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30"
              >
                <Plus className="w-5 h-5" />
                Ajouter un jour
              </button>
            </div>
          </div>

          {/* Tabs with Glass Effect */}
          <div className="flex gap-2 mb-6 bg-white/50 backdrop-blur-sm p-1 rounded-xl shadow-sm">
            <button
              onClick={() => setActiveTab('planning')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'planning'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'hover:bg-white/80 text-gray-600'
              }`}
            >
              Planning
            </button>
            <button
              onClick={() => setActiveTab('budget')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'budget'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'hover:bg-white/80 text-gray-600'
              }`}
            >
              Budget
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'checklist'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'hover:bg-white/80 text-gray-600'
              }`}
            >
              Check-list
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === 'map'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'hover:bg-white/80 text-gray-600'
              }`}
            >
              Carte
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 pb-12">
            {activeTab === 'planning' && tripDays.map((day) => (
              <DayPlanner
                key={day.id}
                day={day}
                onUpdate={(updatedDay) => updateDay(day.id, updatedDay)}
                onRemove={() => removeDay(day.id)}
              />
            ))}
            {activeTab === 'budget' && <TripBudget />}
            {activeTab === 'checklist' && <TripChecklist />}
            {activeTab === 'map' && <TripMap locations={locations} />}
          </div>
        </div>
      </div>
    </div>
  );
}