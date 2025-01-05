import React, { useState } from 'react';
import { Check, Plus, Trash2 } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  category: string;
}

export default function TripChecklist() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<ChecklistItem>>({
    text: '',
    category: 'documents'
  });

  const categories = [
    { id: 'documents', name: 'Documents' },
    { id: 'clothes', name: 'Vêtements' },
    { id: 'toiletries', name: 'Toilette' },
    { id: 'electronics', name: 'Électronique' },
    { id: 'other', name: 'Autre' }
  ];

  const addItem = () => {
    if (!newItem.text || !newItem.category) return;

    const item: ChecklistItem = {
      id: crypto.randomUUID(),
      text: newItem.text,
      category: newItem.category,
      checked: false
    };

    setItems([...items, item]);
    setNewItem({ text: '', category: 'documents' });
    setShowAddItem(false);
  };

  const toggleItem = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const itemsByCategory = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-semibold">Check-list du Voyage</h3>
          <p className="text-gray-500">
            {items.filter(item => item.checked).length}/{items.length} éléments cochés
          </p>
        </div>
        <button
          onClick={() => setShowAddItem(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter un élément
        </button>
      </div>

      {/* Checklist by Category */}
      <div className="space-y-8">
        {categories.map(category => {
          const categoryItems = itemsByCategory[category.id] || [];
          if (categoryItems.length === 0) return null;

          return (
            <div key={category.id}>
              <h4 className="font-medium text-gray-900 mb-4">{category.name}</h4>
              <div className="space-y-2">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.checked
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'border-gray-300'
                      }`}
                    >
                      {item.checked && <Check className="w-4 h-4" />}
                    </button>
                    <span className={`flex-1 ${item.checked ? 'line-through text-gray-400' : ''}`}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Checklist Item Form */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-6">Ajouter un élément</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catégorie
                </label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Élément
                </label>
                <input
                  type="text"
                  value={newItem.text}
                  onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Que devez-vous emporter ?"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddItem(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={addItem}
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