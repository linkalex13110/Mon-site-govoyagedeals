import React, { useState } from 'react';
import { Clock, MapPin, Plus, Trash2, Tag } from 'lucide-react';

interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  notes: string;
  category: 'transport' | 'hotel' | 'restaurant' | 'activity' | 'other';
}

interface DayPlannerProps {
  day: {
    id: string;
    date: Date;
    activities: Activity[];
  };
  onUpdate: (updatedDay: any) => void;
  onRemove: () => void;
}

export default function DayPlanner({ day, onUpdate, onRemove }: DayPlannerProps) {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState<Partial<Activity>>({
    time: '',
    title: '',
    location: '',
    notes: '',
    category: 'activity'
  });

  const addActivity = () => {
    if (!newActivity.title) return;

    const activity: Activity = {
      id: crypto.randomUUID(),
      time: newActivity.time || '',
      title: newActivity.title || '',
      location: newActivity.location || '',
      notes: newActivity.notes || '',
      category: newActivity.category as Activity['category'] || 'activity'
    };

    onUpdate({
      ...day,
      activities: [...day.activities, activity]
    });

    setNewActivity({
      time: '',
      title: '',
      location: '',
      notes: '',
      category: 'activity'
    });
    setShowAddActivity(false);
  };

  const removeActivity = (activityId: string) => {
    onUpdate({
      ...day,
      activities: day.activities.filter(a => a.id !== activityId)
    });
  };

  const categoryColors = {
    transport: 'bg-blue-100 text-blue-700',
    hotel: 'bg-purple-100 text-purple-700',
    restaurant: 'bg-orange-100 text-orange-700',
    activity: 'bg-green-100 text-green-700',
    other: 'bg-gray-100 text-gray-700'
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">
            {day.date.toLocaleDateString('fr-FR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </h3>
          <p className="text-gray-500">
            {day.activities.length} activité{day.activities.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAddActivity(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Activité
          </button>
          <button
            onClick={onRemove}
            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {day.activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[activity.category]}`}>
                  {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                </span>
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{activity.time}</span>
                </div>
                {activity.location && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{activity.location}</span>
                  </div>
                )}
              </div>
              <h4 className="font-medium text-gray-900">{activity.title}</h4>
              {activity.notes && (
                <p className="mt-2 text-sm text-gray-600">{activity.notes}</p>
              )}
            </div>
            <button
              onClick={() => removeActivity(activity.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Activity Form */}
      {showAddActivity && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-6">Ajouter une activité</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heure
                  </label>
                  <input
                    type="time"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newActivity.category}
                    onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value as Activity['category'] })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="transport">Transport</option>
                    <option value="hotel">Hôtel</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="activity">Activité</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre
                </label>
                <input
                  type="text"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nom de l'activité"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu
                </label>
                <input
                  type="text"
                  value={newActivity.location}
                  onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Adresse ou lieu"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  value={newActivity.notes}
                  onChange={(e) => setNewActivity({ ...newActivity, notes: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Informations complémentaires..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddActivity(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={addActivity}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}