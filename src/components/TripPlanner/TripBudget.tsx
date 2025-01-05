import React, { useState } from 'react';
import { DollarSign, Plus, Trash2 } from 'lucide-react';

interface BudgetItem {
  id: string;
  category: string;
  description: string;
  amount: number;
}

export default function TripBudget() {
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<BudgetItem>>({
    category: '',
    description: '',
    amount: 0
  });

  const addItem = () => {
    if (!newItem.category || !newItem.description || !newItem.amount) return;

    const item: BudgetItem = {
      id: crypto.randomUUID(),
      category: newItem.category,
      description: newItem.description,
      amount: newItem.amount
    };

    setItems([...items, item]);
    setNewItem({ category: '', description: '', amount: 0 });
    setShowAddItem(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalBudget = items.reduce((sum, item) => sum + item.amount, 0);

  const categories = [
    'Transport',
    'Hébergement',
    'Restauration',
    'Activités',
    'Shopping',
    'Autre'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Budget du Voyage</h3>
          <p className="text-3xl font-bold text-blue-600">{totalBudget}€</p>
        </div>
        <button
          onClick={() => setShowAddItem(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Ajouter une dépense
        </button>
      </div>

      {/* Budget Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {item.category}
                </span>
                <span className="text-gray-500">{item.description}</span>
              </div>
              <p className="font-semibold">{item.amount}€</p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add Budget Item Form */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-6">Ajouter une dépense</h3>
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
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description de la dépense"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Montant (€)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={newItem.amount}
                    onChange={(e) => setNewItem({ ...newItem, amount: parseFloat(e.target.value) })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
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